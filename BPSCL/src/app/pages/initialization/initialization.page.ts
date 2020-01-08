import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "./../../services/database.service";
import { StorageService } from "./../../services/storage.service";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-initialization",
  templateUrl: "./initialization.page.html",
  styleUrls: ["./initialization.page.scss"]
})
export class InitializationPage implements OnInit {
  userId: number = 0;
  stateId: number = 0;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private loadingController: LoadingController,
    private storageService: StorageService
  ) {
    this.loadUserDetails();
    this.loadSessionDetails();
  }

  ngOnInit() {
    if (!this.db.isDbReady) {
      console.log("Database is not ready... Initializing DB...");
      // this.presentLoading();
      this.prepareDatabase();
    } else {
      console.log("Database is ready... :)");
      this.redirector();
      // this.router.navigate(["/home"]);
    }
  }

  loadUserDetails() {
    this.storageService
      .getObject("userDetails")
      .then(data => {
        console.log("User details are -> " + JSON.stringify(data));
        this.userId = data.userId;
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
      })
      .catch(error => {
        console.error(
          "sessionDetails were not set -> " + JSON.stringify(error)
        );
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Please wait, <br/>Database is Initializing...",
      translucent: true
    });
    await loading.present();
  }

  async prepareDatabase() {
    console.log("prepareDatabase func is started...");

    const loading = await this.loadingController
      .create({
        message: "Please wait, <br/>Database is Initializing...",
        translucent: true
      })
      .then(a => {
        a.present().then(async res => {
          console.log("presented");
          let data = await this.db
            .checkTable()
            .then(async (res: any) => {
              let data = await res;
              if (!data) {
                console.error(
                  "checkTable() -> Something went wrong -> " +
                    JSON.stringify(res)
                );
              } else {
                console.log("Table is ready :) -> " + JSON.stringify(res));
              }
              return data;
            })
            .catch((error: any) => {
              console.error(
                "catch -> Table doesn't exist -> " + JSON.stringify(error)
              );
              return false;
            });

          console.log("After execution prepareDatabase() result is -> " + data);
          if (data) {
            a.dismiss();
            this.redirector();
            this.router.navigate(["/home"]);
          }
        });
      });
  }

  redirector() {
    if (this.stateId > 0) {
      this.router.navigate(["/beneficiary-registration"]);
    } else if (this.userId > 0) {
      this.router.navigate(["/session-selection"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
