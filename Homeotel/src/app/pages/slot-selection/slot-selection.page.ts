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

  allAvailableWeekdays: any[] = [];

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
    console.log("this.utilities.bookAppointmentDoctorDetails is below");
    console.log(this.utilities.bookAppointmentDoctorDetails);

    let allSlots: any[] = [];

    this.utilities.bookAppointmentDoctorDetails["doctorSlotDetails"].forEach(
      slot => {
        console.log(
          "weekDays -> " +
            slot["weekDays"] +
            " <> fromTime -> " +
            slot["fromTime"] +
            " <> toTime -> " +
            slot["toTime"]
        );
        let tempFromTime = slot["fromTime"];
        let tempToTime = slot["toTime"];

        let weekDaysArray = slot["weekDays"].split(",");
        weekDaysArray.forEach(weekDay => {
          let currentSlot: any[] = [];
          currentSlot["fromTime"] = tempFromTime;
          currentSlot["toTime"] = tempToTime;
          currentSlot["weekDay"] = weekDay;
          console.log(
            weekDay +
              " weekDay fromTime ->" +
              slot["fromTime"] +
              " -- toTime ->" +
              slot["toTime"]
          );
          allSlots.push(currentSlot);
        });
        this.allAvailableWeekdays = [
          ...this.allAvailableWeekdays,
          ...weekDaysArray
        ];
      }
    );
    allSlots = allSlots.sort((a, b) => {
      if (a.weekDay > b.weekDay) return 1;
      else return -1;
    });
    console.log("allSlots is below");
    console.log(allSlots);
    this.allAvailableWeekdays = this.allAvailableWeekdays.sort((a, b) => {
      if (a > b) return 1;
      else return -1;
    });
    console.log(this.allAvailableWeekdays);
  }

  ngOnInit() {}

  selectSlot = (period, time) => {
    console.log("Slot selected for ->" + period + " - " + time);
    this.router.navigate(["/consultation-details"]);
  };
}
