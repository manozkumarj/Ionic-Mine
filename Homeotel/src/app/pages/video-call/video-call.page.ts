import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { UtilitiesService } from "./../../services/utilities.service";

@Component({
  selector: "app-video-call",
  templateUrl: "./video-call.page.html",
  styleUrls: ["./video-call.page.scss"],
})
export class VideoCallPage implements OnInit {
  nextUpcomingAppointmentId = 0;
  commonServiceUpcomingAppointment;

  constructor(
    private commonService: CommonService,
    private loadingController: LoadingController,
    private utilities: UtilitiesService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.commonServiceUpcomingAppointment = this.commonService.upcomingAppointment;
    if (this.commonServiceUpcomingAppointment) {
      this.nextUpcomingAppointmentId = this.commonServiceUpcomingAppointment[
        "appointment_id"
      ];
      this.commonService.upcomingAppointment = null;
    } else {
      this.utilities.presentToastWarning("Something went wrong");
      this.router.navigate(["/home"]);
    }
  }

  makeCall = async () => {
    console.log("makeCall func triggered");
    const loading = await this.loadingController.create({
      message: "Please wait, <br/>Initiating video call...",
      duration: 5000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log("Loading dismissed!");
  };
}
