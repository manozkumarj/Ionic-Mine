import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { CommonService } from "../../services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.page.html",
  styleUrls: ["./modal.page.scss"],
})
export class ModalPage implements OnInit {
  action;
  uuid;
  doctorDetails: any[] = [];
  doctorConsultationModesAndDetails: any[] = [];
  doctorSlotDetails: any[] = [];

  constructor(
    public modalCtrl: ModalController,
    navParams: NavParams,
    private commonService: CommonService,
    private router: Router,
    private apiService: ApiService,
    private utilities: UtilitiesService
  ) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get("action"));
    this.action = navParams.get("action");
    if (this.action == "findDoctor") {
      this.uuid = navParams.get("searchableDoctorUuid");
      this.findDoctor(this.uuid);
    } else if (this.action == "contactDoctor") {
      let doctorId = navParams.get("doctorId");
      console.log("doctorId -> " + doctorId);
      this.getDoctorConsultantDetails(doctorId);
    } else if (this.action == "makePayment") {
      if (navParams.get("paymentFor") == "homeokit") {
        console.log("Homeokit payment");
        let doctorId = this.utilities.purchasableHomeokitDoctorId;
        let kitId = this.utilities.purchasableHomeokitId;
        let price = this.utilities.purchasableHomeokitPrice;
        this.apiService
          .purchaseHomeokit(doctorId, kitId, price)
          .subscribe((data) => {
            console.log("Returned from Backend");
            console.log(JSON.stringify(data));
            if (this.utilities.isInvalidApiResponseData(data)) {
              console.log("Returned Error");
            } else {
              if (data["error"]) {
                console.log("Homeokit purchase payment failed");
              } else {
                console.log("Homeokit purchase payment success");
              }
            }
          });
      } else if (navParams.get("paymentFor") == "slotBooking") {
        console.log("slotBooking payment");
        console.log("bookAppointmentDetails obj is below");
        console.log(this.utilities.bookAppointmentDetails);

        console.log("bookAppointmentDoctorDetails obj is below");
        console.log(this.utilities.bookAppointmentDoctorDetails);

        let appointmentId = this.utilities.bookAppointmentDetails[
          "appointmentId"
        ];
        let doctorId = this.utilities.bookAppointmentDoctorDetails["id"];

        let relativeId = this.utilities.bookAppointmentDetails["relativeId"];
        let price = this.utilities.bookAppointmentDetails["price"];
        let dateNtime = this.utilities.bookAppointmentDetails["dateNtime"];
        let modeId = this.utilities.bookAppointmentDetails["bookableModeId"];
        let mainComplaint = this.utilities.bookAppointmentDetails[
          "description"
        ];

        this.apiService
          .bookAppointment(
            appointmentId,
            doctorId,
            relativeId,
            price,
            dateNtime,
            modeId,
            mainComplaint
          )
          .subscribe((data) => {
            console.log("Returned from Backend");
            console.log(JSON.stringify(data));
            if (this.utilities.isInvalidApiResponseData(data)) {
              console.log("Returned Error");
              console.log(data[0][0]);
              if (data[0][0]["error"]) {
                console.log("Something went wrong");
              }
            } else {
              console.log("Returned Success");
            }
          });
      }
      this.utilities.isSlotBookingAction = false;
      this.utilities.isHomeokitPurchaseAction = false;
    }
  }

  ngOnInit() {}

  getDoctorConsultantDetails(doctorId) {
    this.apiService
      .getDoctorConsultantDetailsMasters(doctorId)
      .subscribe((data) => {
        console.log("Returned from Backend");
        console.log(data);
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log("Returned Error");
        } else {
          if (
            typeof data != "undefined" &&
            typeof data[0] != "undefined" &&
            typeof data[0][0] != "undefined"
          ) {
            console.log("Received master data");
            let masterData = data[0];
            masterData.forEach((masterRow) => {
              if (masterRow.master_type == "doctorDetails") {
                this.doctorDetails.push({
                  name: masterRow.colOne,
                  username: masterRow.colTwo,
                });
                this.utilities.bookAppointmentDoctorDetails["name"] =
                  masterRow.colOne;
                this.utilities.bookAppointmentDoctorDetails["username"] =
                  masterRow.colTwo;
              } else if (masterRow.master_type == "modes") {
                this.doctorConsultationModesAndDetails.push({
                  id: masterRow.colOne,
                  consultationMode: masterRow.colTwo,
                  time: masterRow.colThree,
                  price: masterRow.colFour,
                });
              } else if (masterRow.master_type == "doctorSlotDetails") {
                this.doctorSlotDetails.push({
                  clinicId: masterRow.colOne,
                  weekDays: masterRow.colTwo,
                  fromTime: masterRow.colThree,
                  toTime: masterRow.colFour,
                });
                this.utilities.bookAppointmentDoctorDetails[
                  "doctorSlotDetails"
                ] = this.doctorSlotDetails;
              }

              this.utilities.bookAppointmentDoctorDetails[
                "bookedAppointments"
              ] = data[1];
            });
            // console.log(this.doctorDetails);
            // console.log(this.doctorSlotDetails);
            console.log(this.utilities.bookAppointmentDoctorDetails);
          } else {
            console.log("Master data fetching failed");
          }
        }
      });
  }

  findDoctor(uuid) {
    this.apiService.findDoctor(uuid).subscribe((data) => {
      console.log("Returned from Backend");
      console.log(JSON.stringify(data[0]));
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (
          typeof data != "undefined" &&
          typeof data[0] != "undefined" &&
          typeof data[0][0] != "undefined"
        ) {
          console.log("Doctor found");
          this.doctorDetails = data[0];
          console.log(this.doctorDetails);
        } else {
          console.log("No doctor found");
        }
      }
    });
  }

  addDoctor = (doctorId) => {
    console.log("doctorId -> " + doctorId);
    this.commonService.foundDoctor = true;
    this.onCancel();

    this.apiService.addDoctor(doctorId).subscribe((data) => {
      console.log("Returned from Backend");
      console.log(JSON.stringify(data));
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (data["error"]) {
          console.log("Doctor addition failed");
          this.utilities.presentToastWarning("Failed, Something went wrong");
        } else {
          console.log("Doctor added");
          this.utilities.presentToastSuccess("Success, Doctor added");
        }
      }
      this.router.navigate(["/home"]);
    });
  };

  onCancel = (isRedirect = false) => {
    this.modalCtrl.dismiss("cancel");
    if (isRedirect) {
      if (this.action == "makePayment")
        this.utilities.presentToastSuccess("Success, Payment successful.");
      this.router.navigate(["/home"]);
    }
  };

  selectConsultation = (modeId, price) => {
    console.log("modeId -> " + modeId);
    console.log("price -> " + price);
    this.utilities.bookAppointmentDetails["bookableModeId"] = modeId;
    this.utilities.bookAppointmentDetails["price"] = price;
    this.onCancel();
    this.router.navigate(["/slot-selection"]);
  };
}
