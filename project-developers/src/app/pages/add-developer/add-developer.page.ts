import { ApiService } from './../../services/api.service';
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-developer",
  templateUrl: "./add-developer.page.html",
  styleUrls: ["./add-developer.page.scss"]
})
export class AddDeveloperPage implements OnInit {
  developerForm: FormGroup;
  genders;

  constructor(private router: Router, private api: ApiService) {
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

    let newDeveloper = {
      id: ++this.api.totalDevelopers,
      name,
      role,
      gender
    }

    this.api.addDeveloper(newDeveloper);

    // console.log(newDeveloper);
    this.router.navigate(["/all-developers/done"]);
  }
}
