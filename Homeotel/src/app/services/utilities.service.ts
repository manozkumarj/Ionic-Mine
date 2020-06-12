import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Injectable()
export class UtilitiesService {
  userId = null;
  isLoggedId = false;

  selectedRelativeId = 0;

  isHomeokitPurchaseAction = false;
  isSlotBookingAction = false;
  purchasableHomeokitDoctorId;
  purchasableHomeokitId;
  purchasableHomeokitPrice;

  currentUserDetails = {};

  bookAppointmentDoctorDetails = {};
  bookAppointmentDetails = {};
  selectedAppointmentComplaintDetails = {};
  bookableModeId;

  profilePageDetails: any[] = [];
  vitalPageState: any[] = [];
  filesPageState: any[] = [];
  medicalHistoryPageState: any[] = [];
  relationsMedicalHistoryPageState: any[] = [];
  lifestylePageState: any[] = [];

  date = new Date();
  todayDate = this.date.getDate();
  currentMonth = this.date.getMonth() + 1;
  currentYear = this.date.getFullYear();

  upcomingAppointment: any;
  interValid;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {
    this.interValid = setInterval(
      () => this.checkUpcomingAppointment(this.upcomingAppointment),
      30000
    );
  }

  checkUpcomingAppointment(upcomingAppointment) {
    console.log("checkUpcomingAppointment triggered");
    console.log("upcomingAppointment array is below");
    console.log(upcomingAppointment);
    if (upcomingAppointment) {
      this.checkTimestamp(upcomingAppointment);
    }
  }

  checkTimestamp(upcomingAppointment) {
    console.log("checkTimestamp triggered");
    let exactAppointmentTime =
      upcomingAppointment["getAppointmentMilliseconds"];
    let appointmentTimeMinus5 =
      upcomingAppointment["getAppointmentMillisecondsMinus5"];
    let appointmentTimePlus5 =
      upcomingAppointment["getAppointmentMillisecondsPlus5"];

    let date = new Date();
    let getCurrentMilliseconds = date.getTime();

    console.log("*****************************************");
    console.log(getCurrentMilliseconds);
    console.log(appointmentTimeMinus5);
    console.log(appointmentTimePlus5);

    if (
      getCurrentMilliseconds >= appointmentTimeMinus5 &&
      getCurrentMilliseconds <= appointmentTimePlus5
    ) {
      // alert("You have an appointment within  minutes");
      this.presentToastWarning(
        "You have an Appointment within few minutes" +
          upcomingAppointment["appointment_id"]
      );
    }
  }

  async presentToastSuccess(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: "toast-success",
      animated: true,
    });
    toast.present();
  }

  async presentToastWarning(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: "toast-error",
      animated: true,
    });
    toast.present();
  }

  sqliteErrorDisplayer(funcName, error) {
    alert(funcName + " <->" + JSON.stringify(error));
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  getPhotoDataUrl(photoImgData) {
    if (photoImgData) {
      return photoImgData;
    } else {
      return "assets/images/avatar.png";
    }
  }

  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  cleanUpTextAllowOnlyAlphabetsAndSpaces(text) {
    //remove any special characters if present
    text = text.replace(/[^a-zA-Z\s]/g, "");

    //remove multiple spaces
    text = text.replace(/  +/g, " ");

    //remove spaces at the beginning and end
    text = text.replace(/^\s+/g, "");

    return text;
  }

  cleanUpTextRemovingSpacesAtEnd(text) {
    text = text.replace(/\s+$/g, "");
    return text;
  }

  cleanUpNumberAllowOnlyNumbers(number) {
    number = number.replace(/[^0-9]/g, "");
    return number;
  }

  isInvalidApiResponseData(data) {
    if (
      !data ||
      (data && data.hasOwnProperty("error")) ||
      (data && data[0] && data[0].hasOwnProperty("error")) ||
      (data && data[0] && data[0][0] && data[0][0].hasOwnProperty("error"))
    )
      return true;
    else return false;
  }

  getErrorMessage(formControl) {
    return formControl.hasError("required")
      ? "required_error_msg"
      : formControl.hasError("pattern")
      ? "invalid_error_msg"
      : formControl.hasError("min")
      ? "invalid_error_msg"
      : formControl.hasError("max")
      ? "invalid_error_msg"
      : formControl.hasError("minlength")
      ? "invalid_error_msg"
      : formControl.hasError("maxlength")
      ? "invalid_error_msg"
      : "";
  }
}
