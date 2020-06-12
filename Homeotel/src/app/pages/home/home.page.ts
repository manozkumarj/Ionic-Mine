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
  }

  ionViewWillEnter() {
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

              // let getAllAppointmentsTimings = this.allAppointments.map(
              //   (appointment) => appointment["appointment_at"]
              // );
              // console.log("getAllAppointmentsTimings are below");
              // console.log(getAllAppointmentsTimings);

              let getUpcomingAppointment = this.allAppointments.map(
                (appointment) => {
                  let date = new Date();
                  let getCurrentMilliseconds = date.getMilliseconds();

                  let getAppointmentDateTime = appointment["appointment_at"];
                  let convertAppointmentDateTimeToDate = new Date(
                    getAppointmentDateTime
                  );
                  let getAppointmentMilliseconds = convertAppointmentDateTimeToDate.getMilliseconds();
                  let getAppointmentMillisecondsMinus5 =
                    getAppointmentMilliseconds - 5 * 60 * 60;
                  let getAppointmentMillisecondsPlus5 =
                    getAppointmentMilliseconds + 5 * 60 * 60;

                  if (
                    getCurrentMilliseconds >= getAppointmentMillisecondsMinus5
                  ) {
                    return [
                      ...appointment,
                      {
                        getAppointmentMilliseconds,
                        getAppointmentMillisecondsMinus5,
                        getAppointmentMillisecondsPlus5,
                      },
                    ];
                  } else {
                    return;
                  }

                  // let getMonth = convertAppointmentDateTimeToDate.getMonth()+1;
                  // let getDate = convertAppointmentDateTimeToDate.getDate();
                  // let splitDateTime = getDateTime.split(" ");
                  // let storeDate = splitDateTime[0];
                  // let storeTime = splitDateTime[1];
                }
              );

              console.log("getUpcomingAppointment is below");
              console.log(getUpcomingAppointment);

              this.utilities.upcomingAppointment = getUpcomingAppointment;
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
