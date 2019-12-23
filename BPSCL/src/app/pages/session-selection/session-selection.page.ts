import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-session-selection",
  templateUrl: "./session-selection.page.html",
  styleUrls: ["./session-selection.page.scss"]
})
export class SessionSelectionPage implements OnInit {
  sessionForm: FormGroup;
  servicePoints: any[] = [];
  states: any[] = [];
  districts: any[] = [];
  mandals: any[] = [];
  villages: any[] = [];
  sessionTypeId: number;
  sessionPeriodId: number;
  sessionTypes: any[] = [];

  userId: number;
  vanId: number;
  deviceId: number;

  stateId: number;
  districtId: number;
  mandalId: number;
  villageId: number;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.assignUserDetails();

    this.sessionForm = new FormGroup({
      stateId: new FormControl("", Validators.required),
      districtId: new FormControl("", Validators.required),
      mandalId: new FormControl("", Validators.required),
      villageId: new FormControl("", Validators.required),
      servicePointId: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.getSessionTypes();
    this.getStates();
  }

  assignUserDetails() {
    this.storageService
      .getObject("user")
      .then(data => {
        this.userId = data.userId;
        this.vanId = data.vanId;
        this.deviceId = data.deviceId;
      })
      .catch(error => {
        console.log("User details were not set");
      });
  }

  getSessionTypes() {
    this.db
      .getSessionTypes()
      .then(sessionTypes => {
        console.log("Fetched states -> " + JSON.stringify(sessionTypes));
        this.sessionTypes = sessionTypes;
      })
      .catch(error => {
        console.error(
          "Error -> getSessionTypes() function returned error." +
            JSON.stringify(error)
        );
      });
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

  getServicePoints(
    selectedStateId,
    selectedDistrictId,
    selectedMandalId,
    selectedVillageId
  ) {
    this.db
      .getServicePoints(
        selectedStateId,
        selectedDistrictId,
        selectedMandalId,
        selectedVillageId
      )
      .then(servicePoints => {
        console.log(
          "Fetched Service Points -> " + JSON.stringify(servicePoints)
        );
        this.servicePoints = servicePoints;
      })
      .catch(error => {
        console.error(
          "Error -> getServicePoints() function returned error." +
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
    console.log("State changed -> " + this.sessionForm.get("stateId").value);
    this.districts = [];
    this.mandals = [];
    this.villages = [];
    this.servicePoints = [];
    this.stateId = this.sessionForm.get("stateId").value;
    this.getDistricts(this.stateId);
  }

  districtChanged() {
    console.log(
      "District changed -> " + this.sessionForm.get("districtId").value
    );
    this.mandals = [];
    this.villages = [];
    this.servicePoints = [];
    this.districtId = this.sessionForm.get("districtId").value;
    this.getMandals(this.stateId, this.districtId);
  }

  mandalChanged() {
    console.log("Mandal changed -> " + this.sessionForm.get("mandalId").value);
    this.villages = [];
    this.servicePoints = [];
    this.mandalId = this.sessionForm.get("mandalId").value;
    this.getVillages(this.stateId, this.districtId, this.mandalId);
  }

  villageChanged() {
    console.log(
      "Village changed -> " + this.sessionForm.get("villageId").value
    );
    this.servicePoints = [];
    this.villageId = this.sessionForm.get("villageId").value;
    this.getServicePoints(
      this.stateId,
      this.districtId,
      this.mandalId,
      this.villageId
    );
  }

  sessionChange(id) {
    console.log("Session selected " + id);
    this.sessionTypeId = id;
    this.db
      .getStartingSessionPeriodId(id)
      .then(sessionPeriodId => {
        this.sessionPeriodId = sessionPeriodId;
      })
      .catch(error => {
        console.error(
          "Error -> getStartingSessionPeriodId() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  onSubmit(values) {
    console.log("Session form is submitted, below are the values");
    console.log(values);
    let userId = this.userId;
    let sessionPeriodId = this.sessionPeriodId;
    let sessionTypeId = this.sessionTypeId;
    let deviceId = this.deviceId;
    let vanId = this.vanId;
    let servicePointId = this.sessionForm.get("servicePointId").value;

    let sessionDetails = {
      userId,
      sessionPeriodId,
      sessionTypeId,
      deviceId,
      vanId
    };

    let servicePointDetails = {
      deviceId,
      vanId,
      servicePointId,
      userId
    };

    this.db
      .saveSessionDetails(sessionDetails)
      .then(data => {
        console.log("Success - saveSessionDetails -> " + data);
        this.db
          .saveServicePointLog(servicePointDetails)
          .then(data => {
            console.log("Success - saveServicePointLog -> " + data);
            // this.router.navigate(["/beneficiary-registration"]);
          })
          .catch(error => {
            console.error(
              "Error -> saveServicePointLog() function returned error." +
                JSON.stringify(error)
            );
          });
      })
      .catch(error => {
        console.error(
          "Error -> saveSessionDetails() function returned error." +
            JSON.stringify(error)
        );
      });
  }
}
