import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { DatabaseService } from "./database.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  doctors;
  familyMembers;
  foundDoctor: boolean = false;

  selectedHomeKitCost;

  upcomingAppointment: any;
  alertShowableInterval;

  loadAppointmentsInterval;

  appointmentsLoadingInterval = 1 * 1000 * 60; // every minute

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private db: DatabaseService,
    private utilities: UtilitiesService,
    public auth: AuthService
  ) {
    this.doctors = [
      {
        id: 1,
        name: "Uday Kumar",
        img: "assets/images/bill.jpg",
      },
      {
        id: 2,
        name: "Bharat Raj",
        img: "assets/images/larry.jpg",
      },
      {
        id: 3,
        name: "Manoj Kumar",
        img: "assets/images/zuck.jpg",
      },
      {
        id: 4,
        name: "Mallesh",
        img: "assets/images/mark.jpg",
      },
      {
        id: 5,
        name: "Rohit Kumar",
        img: "assets/images/sergey.jpg",
      },
      {
        id: 6,
        name: "Maruthi",
        img: "assets/images/warren.jpg",
      },
    ];

    this.familyMembers = [
      {
        id: 1,
        name: "Uday Kumar",
        img: "assets/images/bill.jpg",
        relation: "Mother",
      },
      {
        id: 2,
        name: "Bharat Raj",
        img: "assets/images/larry.jpg",
        relation: "Father",
      },
      {
        id: 3,
        name: "Manoj Kumar",
        img: "assets/images/zuck.jpg",
        relation: "Son",
      },
      {
        id: 4,
        name: "Mallesh",
        img: "assets/images/mark.jpg",
        relation: "Daughter",
      },
      {
        id: 5,
        name: "Rohit Kumar",
        img: "assets/images/sergey.jpg",
        relation: "Grand-son",
      },
      {
        id: 6,
        name: "Maruthi",
        img: "assets/images/warren.jpg",
        relation: "Grand-daughter",
      },
    ];

    this.loadAppointmentsInterval = setInterval(
      () => this.loadAppointmentsFromSqlite(),
      this.appointmentsLoadingInterval
    );
  }

  checkUpcomingAppointment() {
    let upcomingAppointment = this.upcomingAppointment;
    console.log("checkUpcomingAppointment triggered");
    console.log("upcomingAppointment array is below");
    console.log(upcomingAppointment);
    if (upcomingAppointment && upcomingAppointment["showAlert"]) {
      this.checkTimestamp(upcomingAppointment);
    }
  }

  checkTimestamp(upcomingAppointment) {
    console.log("checkTimestamp triggered");
    let appointmentStartTime =
      upcomingAppointment["getAppointmentStartMilliseconds"];
    let appointmentEndTime =
      upcomingAppointment["getAppointmentEndMilliseconds"];

    let date = new Date();
    let getCurrentMilliseconds = date.getTime();

    console.log("*****************************************");
    console.log(getCurrentMilliseconds);
    console.log(appointmentStartTime);
    console.log(appointmentEndTime);

    if (
      getCurrentMilliseconds >= appointmentStartTime &&
      getCurrentMilliseconds <= appointmentEndTime
    ) {
      // alert("You have an appointment within  minutes");
      this.utilities.presentToastWarning(
        "You have an Appointment within few minutes" +
          upcomingAppointment["appointment_id"]
      );

      this.alertCtrl
        .create({
          header: "Upcoming Appointment Info",
          message: "You have an appointment withing few minutes",
          buttons: [
            {
              text: "Ignore",
              handler: () => {
                this.upcomingAppointment["showAlert"] = false;
                this.upcomingAppointment["showCallNowButton"] = false;
              },
            },
            {
              text: "View Appointment",
              handler: () => {},
            },
          ],
        })
        .then((alertEl) => {
          alertEl.present();
        });
    }
  }

  loadAppointmentsFromSqlite() {
    clearInterval(this.alertShowableInterval);
    this.db.getUserAppointments(this.utilities.userId).then((res: any[]) => {
      let loadedAllAppointments = res;
      console.log("Appointments found - below they are");
      console.log(loadedAllAppointments);

      let todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);
      let todayMidnightMs = todayMidnight.getTime();

      let tomorrowMidnight = new Date();
      tomorrowMidnight.setHours(24, 0, 0, 0);
      let tomorrowMidnightMs = tomorrowMidnight.getTime();

      let current = new Date();
      let getCurrentMilliseconds = current.getTime();

      let getTodayAppointments = loadedAllAppointments.filter((appointment) => {
        let getAppointmentDateTime = appointment["appointment_at"];
        let convertAppointmentDateTimeToDate = new Date(getAppointmentDateTime);
        let getAppointmentMilliseconds = convertAppointmentDateTimeToDate.getTime();
        if (
          getAppointmentMilliseconds >= todayMidnightMs &&
          getAppointmentMilliseconds <= tomorrowMidnightMs
        ) {
          return appointment;
        }
      });

      console.log("getTodayAppointments are");
      console.log(getTodayAppointments);

      // Mapping today's appointments
      if (getTodayAppointments.length > 0) {
        let getUpcomingAppointments = getTodayAppointments.map(
          (appointment) => {
            let date = new Date();
            let getCurrentMilliseconds = date.getTime();

            let getAppointmentDateTime = appointment["appointment_at"];
            let convertAppointmentDateTimeToDate = new Date(
              getAppointmentDateTime
            );
            let getAppointmentStartMilliseconds = convertAppointmentDateTimeToDate.getTime();
            let getAppointmentEndMilliseconds =
              getAppointmentStartMilliseconds + 30 * 1000 * 60;

            console.log("*****************************************");
            console.log(getCurrentMilliseconds);
            console.log(getAppointmentStartMilliseconds);
            console.log(getAppointmentEndMilliseconds);

            if (
              getCurrentMilliseconds >= getAppointmentStartMilliseconds &&
              getCurrentMilliseconds <= getAppointmentEndMilliseconds
            ) {
              return {
                ...appointment,
                getAppointmentStartMilliseconds,
                getAppointmentEndMilliseconds,
                showAlert: true,
                showCallNowButton: true,
              };
            }
          }
        );

        getUpcomingAppointments = getUpcomingAppointments.filter(
          (appointment) => appointment
        );

        console.log("getUpcomingAppointments is below");
        console.log(getUpcomingAppointments);

        this.upcomingAppointment = { ...getUpcomingAppointments[0] };

        this.alertShowableInterval = setInterval(
          () => this.checkUpcomingAppointment(),
          10000
        );
      }
    });
  }

  logout() {
    this.alertCtrl
      .create({
        header: "Are you sure?",
        message: "Do you want to logout?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Logout",
            handler: () => {
              // alert("User will be logged out");
              // this.auth.logout();
              // this.auth.signOut();
              this.router.navigate(["/login"]);
              clearInterval(this.utilities.alertShowableInterval);
              clearInterval(this.utilities.loadAppointmentsInterval);
              // this.storageService.clear();
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
