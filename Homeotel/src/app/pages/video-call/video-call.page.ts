import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { UtilitiesService } from "./../../services/utilities.service";
import { ApiService } from "src/app/services/api.service";

declare var OT: any;

@Component({
  selector: "app-video-call",
  templateUrl: "./video-call.page.html",
  styleUrls: ["./video-call.page.scss"],
})
export class VideoCallPage implements OnInit {
  nextUpcomingAppointmentId = 0;
  commonServiceUpcomingAppointment;

  session;
  publisher;

  constructor(
    private commonService: CommonService,
    private loadingController: LoadingController,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private router: Router
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.commonServiceUpcomingAppointment = this.commonService.upcomingAppointment;
    if (this.commonServiceUpcomingAppointment) {
      this.nextUpcomingAppointmentId = this.commonServiceUpcomingAppointment[
        "appointment_id"
      ];
      // this.commonService.upcomingAppointment = null;
      let doctorId = this.commonServiceUpcomingAppointment["doctor_id"];

      const loading = await this.loadingController
        .create({
          message: "Please wait...",
          translucent: true,
        })
        .then((a) => {
          a.present()
            .then(async (res) => {
              this.apiService.initiateVideoCall(doctorId).subscribe((data) => {
                a.dismiss();
                console.log("Returned from Backend");
                console.log(data);
                if (this.utilities.isInvalidApiResponseData(data)) {
                  this.utilities.presentToastWarning("Something went wrong");
                } else {
                  this.makeCall(data["sessionId"], data["token"]);
                  // console.log("success, we can continue to make call");
                }
              });
            })
            .catch((error) => {
              a.dismiss();
              this.utilities.sqliteErrorDisplayer(
                "video-call * ionViewWillEnter",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> ionViewWillEnter() function returned error." +
                  JSON.stringify(error)
              );
            });
        });
    } else {
      this.utilities.presentToastWarning("Something went wrong");
      this.router.navigate(["/home"]);
    }
  }

  makeCall_old = async () => {
    console.log("makeCall func triggered");
    const loading = await this.loadingController.create({
      message: "Please wait, <br/>Initiating video call...",
      duration: 5000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log("Loading dismissed!");
  };

  makeCall(sessionId, token) {
    // Initialize Session Object
    this.session = OT.initSession("46720142", sessionId);
    this.publisher = OT.initPublisher("publisher");

    this.session.on({
      streamCreated: (event: any) => {
        console.log("detect stream creation elsewhere 22");
        this.session.subscribe(event.stream, "subscriber");
        OT.updateViews();
      },
      streamDestroyed: (event: any) => {
        console.log(
          `Stream ${event.stream.name} ended because ${event.reason}`
        );
        OT.updateViews();
      },
      sessionConnected: (event: any) => {
        this.session.publish(this.publisher);
      },
    });

    this.session.connect(token, (error: any) => {
      if (error) {
        console.log(`There was an error connecting to the session ${error}`);
      }
    });
  }
}
