import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "./../../services/api.service";
import { DatabaseService } from './../../services/database.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";

@Component({
  selector: 'app-edit-developer',
  templateUrl: './edit-developer.page.html',
  styleUrls: ['./edit-developer.page.scss'],
})
export class EditDeveloperPage implements OnInit {
  developer;
  developerForm: FormGroup;
  genders;
  capturedSnapURL;

  constructor(private router: Router, private api: ApiService, public activatedRoute: ActivatedRoute, private db: DatabaseService) {
    this.developerForm = new FormGroup({
      name: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      terms: new FormControl(false, Validators.pattern("true"))
    });
  }

  ngOnInit() {
    this.genders = ["Male", "Female"];

    let id = this.activatedRoute.snapshot.paramMap.get("id");

    this.db.getDeveloper(id).then(data => {
      this.developer = data;
    }).catch(error => {
      alert("Something went wrong while fetching developer details.");
    });
  }

  ionViewDidEnter() {
    this.developerForm.get('name').setValue(this.developer.name);
    this.developerForm.get('role').setValue(this.developer.role);
    this.developerForm.get('gender').setValue(this.developer.gender);
    this.capturedSnapURL = this.developer.img;
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
    let currentDeveloperId = this.developer.id;

    let name: string = (this.developerForm.get('name').value).toUpperCase();
    let role = this.developerForm.get('role').value;
    let gender = this.developerForm.get('gender').value;
    let img = this.capturedSnapURL;

    let newDeveloper = {
      id: currentDeveloperId,
      name,
      role,
      gender,
      img
    }

    this.db.updateDeveloper(newDeveloper)
      .then(_ => {
        this.capturedSnapURL = null;
        this.router.navigate(["/all-developers/done"]);
      }).catch(error => {
        alert("Developer updation was failed.");
      });
  }

}
