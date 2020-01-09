import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { DatabaseService } from "./../services/database.service";
import { StorageService } from "./../services/storage.service";
import { Platform } from "@ionic/angular";
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription; // for storing the returned subscription
  adminUsers: any[] = [];
  beneficiaries: any[] = [];
  visits: any[] = [];

  userId: number = 0;
  vanId: number = 0;
  deviceId: number = 0;

  stateId: number = 0;
  districtId: number = 0;
  mandalId: number;
  villageId: number;
  servicePointId: number;
  servicePointName: string;

  currentScreenOrientation: string;

  constructor(
    private db: DatabaseService,
    private platform: Platform,
    private storageService: StorageService,
    private screenOrientation: ScreenOrientation
  ) {
    // Changing the app orientation to 'Landscape' and locking it while opening the app.
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    // get current
    this.currentScreenOrientation = this.screenOrientation.type;

    // logs the current orientation, example: 'landscape'
    console.log("Orientation Changed" + this.screenOrientation.type);
  }

  ngOnInit() {
    this.loadUserDetails();
    this.loadSessionDetails();
    this.loadUsers();
    this.loadBeneficiaries();
    this.loadVisits();
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  loadUserDetails() {
    this.storageService
      .getObject("userDetails")
      .then(data => {
        console.log("User details are -> " + JSON.stringify(data));
        this.userId = data.userId;
        this.vanId = data.vanId;
        this.deviceId = data.deviceId;
      })
      .catch(error => {
        console.error("User details were not set -> " + JSON.stringify(error));
      });
  }

  loadSessionDetails() {
    this.storageService
      .getObject("sessionDetails")
      .then(data => {
        console.log("sessionDetails are  -> " + JSON.stringify(data));
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.mandalId = data.mandalId;
        this.villageId = data.villageId;
        this.servicePointId = data.servicePointId;
        this.servicePointName = data.servicePointName;
      })
      .catch(error => {
        console.error(
          "sessionDetails were not set -> " + JSON.stringify(error)
        );
      });
  }

  loadUsers() {
    this.db
      .getUsers()
      .then(users => {
        this.adminUsers = users;
        console.log("Total No. of users = " + users.length);
        console.log("Total users are ==> " + JSON.stringify(users));
      })
      .catch(error => {
        console.error("Database Error " + JSON.stringify(error));
      });
  }

  loadBeneficiaries() {
    this.db
      .getBeneficiaries()
      .then(beneficiaries => {
        console.log(
          "Fetched beneficiaries -> " + JSON.stringify(beneficiaries)
        );
        this.beneficiaries = beneficiaries;
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaries() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadVisits() {
    this.db
      .getVisits()
      .then(visits => {
        console.log("Fetched visits -> " + JSON.stringify(visits));
        this.visits = visits;
      })
      .catch(error => {
        console.error(
          "Error -> getVisits() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
