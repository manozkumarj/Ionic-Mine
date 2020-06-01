import { Component, OnInit } from "@angular/core";
import { CommonService } from "./../../services/common.service";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Platform, LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  backButtonSubscription; // for storing the returned subscription
  allAppointments: any[] = [];

  constructor(
    private commonService: CommonService,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private loadingController: LoadingController,
    private db: DatabaseService,
    private platform: Platform
  ) {
    // this.getAppointments();
    this.loadAppointments();
  }

  async loadAppointments() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserAppointments(this.utilities.userId)
            .then((res: any[]) => {
              this.allAppointments = res;
              console.log("Appointments found - below they are");
              console.log(this.allAppointments);
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "home * loadAppointments",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadAppointments() function returned error." +
                  JSON.stringify(error)
              );
            });
          a.dismiss();
        });
      });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  search() {
    console.log("Clicked on Search");
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
