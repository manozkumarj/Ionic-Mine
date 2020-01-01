import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { DatabaseService } from "./../services/database.service";
import { Platform } from "@ionic/angular";

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
  constructor(private db: DatabaseService, private platform: Platform) {}

  ngOnInit() {
    this.loadUsers();
    this.loadBeneficiaries();
    this.loadVisits();
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
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
