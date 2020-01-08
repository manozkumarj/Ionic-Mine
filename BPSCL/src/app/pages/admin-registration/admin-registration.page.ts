import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

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

  stateId: number;
  districtId: number;
  mandalId: number;
  villageId: number;

  constructor(
    public plt: Platform,
    private db: DatabaseService,
    private router: Router
  ) {
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
      imeiNo: new FormControl("", Validators.required),
      gcmToken: new FormControl("", Validators.required),
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

  getDistricts(selectedStateId) {
    this.db
      .getDistricts(selectedStateId)
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

  getMandals(selectedStateId, selectedDistrictId) {
    this.db
      .getMandals(selectedStateId, selectedDistrictId)
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

  getVillages(selectedStateId, selectedDistrictId, selectedMandalId) {
    this.db
      .getVillages(selectedStateId, selectedDistrictId, selectedMandalId)
      .then(villages => {
        console.log("Fetched villages -> " + JSON.stringify(villages));
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
    this.districts = [];
    this.mandals = [];
    this.villages = [];
    this.stateId = this.adminRegForm.get("stateId").value;
    this.getDistricts(this.stateId);
  }

  districtChanged() {
    console.log(
      "District changed -> " + this.adminRegForm.get("districtId").value
    );
    this.mandals = [];
    this.villages = [];
    this.districtId = this.adminRegForm.get("districtId").value;
    this.getMandals(this.stateId, this.districtId);
  }

  mandalChanged() {
    console.log("Mandal changed -> " + this.adminRegForm.get("mandalId").value);
    this.villages = [];
    this.mandalId = this.adminRegForm.get("mandalId").value;
    this.getVillages(this.stateId, this.districtId, this.mandalId);
  }

  onSubmit(values) {
    console.log("Admin Registration form is submitted, below are the values");
    console.log(values);
    let stateId = this.adminRegForm.get("stateId").value;
    let districtId = this.adminRegForm.get("districtId").value;
    let mandalId = this.adminRegForm.get("mandalId").value;
    let villageId = this.adminRegForm.get("villageId").value;
    let registrationNo = this.adminRegForm.get("vehicleRegistrationNumber")
      .value;
    let parkingPlace = this.adminRegForm.get("parkingPlace").value;
    let imeiNo = this.adminRegForm.get("imeiNo").value;
    let gcmToken = this.adminRegForm.get("gcmToken").value;
    let username = this.adminRegForm.get("username").value;
    let password = this.adminRegForm.get("password").value;

    let adminFormDetails = {
      stateId,
      districtId,
      mandalId,
      villageId,
      registrationNo,
      parkingPlace,
      username,
      password,
      imeiNo,
      gcmToken
    };

    this.db
      .registerAdmin(adminFormDetails)
      .then(res => {
        console.log("Admin registered successfully...!" + JSON.stringify(res));
        this.router.navigate(["/login"]);
      })
      .catch(error => {
        console.error(
          "Error -> Admin registration failed - " + JSON.stringify(error)
        );
      });
  }
}
