import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-slot-selection",
  templateUrl: "./slot-selection.page.html",
  styleUrls: ["./slot-selection.page.scss"]
})
export class SlotSelectionPage implements OnInit {
  doctorId;
  doctorName;
  doctorUsername;
  modeId;
  slotName;

  constructor(private router: Router, private utilities: UtilitiesService) {
    this.doctorId = this.utilities.bookAppointmentDoctorDetails["id"];
    this.doctorName = this.utilities.bookAppointmentDoctorDetails["name"];
    this.doctorUsername = this.utilities.bookAppointmentDoctorDetails[
      "username"
    ];
    this.modeId = this.utilities.bookableModeId;
    this.slotName =
      this.modeId == 1
        ? "Video consultation"
        : this.modeId == 2
        ? "Audio consultation"
        : this.modeId == 3
        ? "Chat consultation"
        : "Personal visit";

    console.log("this.doctorUsername -> " + this.doctorUsername);
  }

  ngOnInit() {}

  selectSlot = (period, time) => {
    console.log("Slot selected for ->" + period + " - " + time);
    this.router.navigate(["/consultation-details"]);
  };
}
