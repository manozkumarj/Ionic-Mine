import { Component } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-health-records",
  templateUrl: "./health-records.page.html",
  styleUrls: ["./health-records.page.scss"],
})
export class HealthRecordsPage {
  faPlusSquare = faPlusSquare;
  healthRecords;

  selectedPerson = this.utilities.selectedRelativeId;

  userRelatives: any[] = [];

  constructor(
    private router: Router,
    public utilities: UtilitiesService,
    private loadingController: LoadingController,
    private db: DatabaseService,
    private apiService: ApiService
  ) {
    this.healthRecords = [
      {
        id: 0,
        name: "Vitals",
        redirectUrl: "/vitals",
      },
      {
        id: 1,
        name: "Medical History",
        redirectUrl: "/medical-history",
      },
      {
        id: 2,
        name: "Lifestyle",
        redirectUrl: "/lifestyle",
      },
      {
        id: 3,
        name: "Files",
        redirectUrl: "/files",
      },
    ];
  }

  ionViewWillEnter() {
    if (this.utilities.isHybridApp) {
      this.loadUserRelatives();
    } else {
      this.getUserRelatives();
    }
  }

  async getUserRelatives() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.getUserRelatives().subscribe((data) => {
            a.dismiss();
            console.log("Returned from Backend");
            console.log(data);
            if (this.utilities.isInvalidApiResponseData(data)) {
              console.log("Returned Error");
            } else {
              if (typeof data != "undefined" && typeof data[0] != "undefined") {
                this.userRelatives = data[0];
              }
            }
          });
        });
      });
  }

  async loadUserRelatives() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserRelatives(this.utilities.userId)
            .then((res: any[]) => {
              console.log(res);
              this.userRelatives = res;
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "health-records * loadUserRelatives",
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

  person(id) {
    console.log("Selected person ID -> " + id);
    if (id == -1) {
      this.router.navigate(["/add-relative/health-records"]);
    } else {
      this.selectedPerson = id;
    }
  }

  redirector(id) {
    this.utilities.selectedRelativeId = this.selectedPerson;
    console.log("Selected person ID -> " + this.selectedPerson);
    console.log("Selected option -> " + this.healthRecords[id]["name"]);
    this.router.navigate([this.healthRecords[id]["redirectUrl"]]);
  }
}
