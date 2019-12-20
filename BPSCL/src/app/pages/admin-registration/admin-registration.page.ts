import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-admin-registration",
  templateUrl: "./admin-registration.page.html",
  styleUrls: ["./admin-registration.page.scss"]
})
export class AdminRegistrationPage implements OnInit {
  adminRegForm: FormGroup;

  constructor(public plt: Platform, private db: DatabaseService) {
    if (this.plt.is("ios")) {
      console.log("I am an iOS device!");
    } else if ("android") {
      console.log("I am an Android device!");
    } else {
      console.log("Browser");
    }

    this.adminRegForm = new FormGroup({
      name: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      terms: new FormControl(false, Validators.pattern("true"))
    });
  }

  ngOnInit() {}
}
