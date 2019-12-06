import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "./../../services/api.service";
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

  constructor(private router: Router, private api: ApiService, public activatedRoute: ActivatedRoute) {
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
    this.developer = this.api.getDeveloper(id);
  }

  ionViewDidEnter() {
    this.developerForm.get('name').setValue(this.developer.name);
    this.developerForm.get('role').setValue(this.developer.role);
    this.developerForm.get('gender').setValue(this.developer.gender);
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

    let newDeveloper = {
      id: currentDeveloperId,
      name,
      role,
      gender
    }

    this.api.deleteDeveloper(this.developer.id);
    this.api.addDeveloper(newDeveloper);

    // console.log(newDeveloper);
    this.router.navigate(["/all-developers/done"]);
  }

}
