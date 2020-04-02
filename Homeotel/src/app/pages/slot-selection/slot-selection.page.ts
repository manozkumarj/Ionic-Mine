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

  startTimeOne;
  startTimeTwo;
  endTimeOne;
  endTimeTwo;

  allAvailableWeekdays: any[] = [];
  allAvailableSlots: any[] = [];

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
    this.splitSlotTimings(
      allSlots[0]["fromTime"],
      allSlots[allSlots.length - 1]["toTime"]
    );

    console.log(allSlots[0]["fromTime"]);
    console.log(allSlots[allSlots.length - 1]["toTime"]);

    this.allAvailableSlots.push(allSlots[0]["fromTime"]);

    this.generateSlots(this.startTimeOne + ":" + this.startTimeTwo);

    console.log("allAvailableSlots is below -> ");
    console.log(this.allAvailableSlots);
  }

  ngOnInit() {}

  splitSlotTimings(startTime, endTime) {
    let splitStartTime = startTime.split(":");
    this.startTimeOne = splitStartTime[0];
    this.startTimeTwo = splitStartTime[1];

    let splitEndTime = endTime.split(":");
    this.endTimeOne = splitEndTime[0];
    this.endTimeTwo = splitEndTime[1];
  }

  generateSlots(currentSlot) {
    let splitCurrentSlot = currentSlot.split(":");
    let currentSlotOne = +splitCurrentSlot[0];
    let currentSlotTwo = splitCurrentSlot[1];

    let endTimeOne = +this.endTimeOne;
    let endTimeTwo = this.endTimeTwo;

    let generateOne = currentSlotOne;
    let generateTwo = "";

    let sendRes;

    if (currentSlotOne == endTimeOne) {
      if (currentSlotTwo == endTimeTwo) {
        return false;
      } else {
        if (currentSlotTwo == "00") {
          generateTwo = "30";
        } else {
          generateOne = generateOne + 1;
          generateTwo = "00";
        }
      }
    } else {
      if (currentSlotTwo == "00") {
        generateTwo = "30";
      } else {
        generateOne = ++generateOne;
        generateTwo = "00";
      }
    }

    sendRes = generateOne.toString() + ":" + generateTwo.toString();
    this.allAvailableSlots.push(sendRes);

    if (sendRes) {
      this.generateSlots(sendRes);
    }
  }

  selectSlot = (period, time) => {
    console.log("Slot selected for ->" + period + " - " + time);
    this.router.navigate(["/consultation-details"]);
  };
}
