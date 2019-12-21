import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";
import { Validators, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-admin-registration",
  templateUrl: "./admin-registration.page.html",
  styleUrls: ["./admin-registration.page.scss"]
})
export class AdminRegistrationPage implements OnInit {
  adminRegForm: FormGroup;
  states: any[] = [];
  districts: any[] = [];
  mandals: any[] = [];
  villages: any[] = [];

  stateId: number = 21;
  districtId: number = 28;
  mandalId: number = 2;
  villageId: number;

  constructor(public plt: Platform, private db: DatabaseService) {
    if (this.plt.is("ios")) {
      console.log("I am an iOS device!");
    } else if ("android") {
      console.log("I am an Android device!");
    } else {
      console.log("Browser");
    }

    this.adminRegForm = new FormGroup({
      stateId: new FormControl("", Validators.required),
      districtId: new FormControl("", Validators.required),
      mandalId: new FormControl("", Validators.required),
      villageId: new FormControl("", Validators.required),
      vehicleRegistrationNumber: new FormControl("", Validators.required),
      parkingPlace: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.getStates();
  }

  getStates() {
    this.db
      .getStates()
      .then(states => {
        console.log("Fetched states -> " + JSON.stringify(states));
        this.states = states;
      })
      .catch(error => {
        console.error(
          "Error -> getStates() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  getDistricts() {
    this.db
      .getDistricts(this.stateId)
      .then(districts => {
        console.log("Fetched districts -> " + JSON.stringify(districts));
        this.districts = districts;
      })
      .catch(error => {
        console.error(
          "Error -> getDistricts() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  getMandals() {
    this.db
      .getMandals(this.stateId, this.districtId)
      .then(mandals => {
        console.log("Fetched mandals -> " + JSON.stringify(mandals));
        this.mandals = mandals;
      })
      .catch(error => {
        console.error(
          "Error -> getMandals() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  getVillags() {
    this.db
      .getVillages(this.stateId, this.districtId, this.mandalId)
      .then(villages => {
        console.log("Fetched districts -> " + JSON.stringify(villages));
        this.villages = villages;
      })
      .catch(error => {
        console.error(
          "Error -> getVillages() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  stateChanged() {
    console.log("State changed -> " + this.adminRegForm.get("stateId").value);
  }

  onSubmit(values) {
    console.log(values);
  }
}
