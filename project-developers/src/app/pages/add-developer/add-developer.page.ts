import { Component, OnInit } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from './../../services/api.service';

@Component({
  selector: "app-add-developer",
  templateUrl: "./add-developer.page.html",
  styleUrls: ["./add-developer.page.scss"]
})
export class AddDeveloperPage implements OnInit {
  developerForm: FormGroup;
  genders;

  capturedSnapURL: string;

  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };


  constructor(private router: Router, private api: ApiService, private camera: Camera) {
    this.developerForm = new FormGroup({
      name: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      terms: new FormControl(false, Validators.pattern("true"))
    });
  }

  ngOnInit() {
    this.genders = ["Male", "Female"];
  }


  takeSnap() {
    console.log("Taking a snapshot");
    this.camera.getPicture(this.cameraOptions).then(
      imageData => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI

        let base64Image = "data:image/jpeg;base64," + imageData;
        this.capturedSnapURL = base64Image;
      },
      err => {
        console.log(err);
        // Handle error
      }
    );
  }


  validation_messages = {
    name: [{ type: "required", message: "Name is required." }],
    role: [{ type: "required", message: "Role is required." }],
    gender: [{ type: "required", message: "Gender is required." }],
    terms: [
      { type: "pattern", message: "You must accept terms and conditions." }
    ]
  };

  onSubmit(values) {
    // console.log(values);
    let name: string = (this.developerForm.get('name').value).toUpperCase();

    let role = this.developerForm.get('role').value;
    let gender = this.developerForm.get('gender').value;
    let img = this.capturedSnapURL;

    let newDeveloper = {
      id: ++this.api.totalDevelopers,
      name,
      role,
      gender,
      img
    }

    this.api.addDeveloper(newDeveloper);
    this.capturedSnapURL = null;

    // console.log(newDeveloper);
    this.router.navigate(["/all-developers/done"]);
  }
}
