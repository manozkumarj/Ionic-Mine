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

  tempTimings: any[] = [];

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

    // console.log("this.doctorUsername -> " + this.doctorUsername);
    // console.log("this.utilities.bookAppointmentDoctorDetails is below");
    // console.log(this.utilities.bookAppointmentDoctorDetails);

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

          // console.log(
          //   weekDay +
          //     " - weekDay fromTime ->" +
          //     slot["fromTime"] +
          //     " -- toTime ->" +
          //     slot["toTime"]
          // );
          allSlots.push(currentSlot);

          let tempMorNAfnAvailability = this.splitSlotTimings(
            currentSlot["fromTime"],
            currentSlot["toTime"]
          );

          // All slots generation
          currentSlot["timings"] = [];
          currentSlot["timings"].push(currentSlot["fromTime"]);

          this.tempTimings = [];
          this.generateSlots(currentSlot["fromTime"]);

          currentSlot["timings"] = [
            ...currentSlot["timings"],
            ...this.tempTimings
          ];

          // Morning slots generation
          currentSlot["morningTimings"] = [];
          // currentSlot["morningTimings"].push(currentSlot["fromTime"]);

          this.tempTimings = [];
          this.generateMorningNAfternoonSlots(
            currentSlot["fromTime"],
            currentSlot["toTime"],
            12,
            1
          );

          currentSlot["morningTimings"] = [
            ...currentSlot["morningTimings"],
            ...this.tempTimings
          ];

          // Afternoon slots generation
          currentSlot["afternoonTimings"] = [];

          this.tempTimings = [];
          this.generateMorningNAfternoonSlots(
            currentSlot["fromTime"],
            currentSlot["toTime"],
            23,
            1
          );

          currentSlot["afternoonTimings"] = [
            ...currentSlot["afternoonTimings"],
            ...this.tempTimings
          ];

          console.log("All timings showing below ------------");
          console.log(currentSlot["timings"]);

          console.log("Morning timings showing below ------------");
          console.log(currentSlot["morningTimings"]);

          console.log("Afternoon timings showing below ------------");
          console.log(currentSlot["afternoonTimings"]);

          // let getIndex = currentSlot["timings"].indexOf("12:00");
          // if (getIndex > -1) {
          //   console.log("Has 12:00 slot");
          // } else {
          //   console.log("Has no 12:00 slot");
          // }
          console.log("******************************");
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
    // console.log("allSlots is below");
    // console.log(allSlots);
    this.allAvailableWeekdays = this.allAvailableWeekdays.sort((a, b) => {
      if (a > b) return 1;
      else return -1;
    });
    // console.log(this.allAvailableWeekdays);
    this.splitSlotTimings(
      allSlots[0]["fromTime"],
      allSlots[allSlots.length - 1]["toTime"]
    );

    // console.log(allSlots[0]["fromTime"]);
    // console.log(allSlots[allSlots.length - 1]["toTime"]);

    this.allAvailableSlots.push(allSlots[0]["fromTime"]);

    this.generateSlots(this.startTimeOne + ":" + this.startTimeTwo);
    this.allAvailableSlots = [...this.allAvailableSlots, ...this.tempTimings];

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

    if (+this.startTimeOne < 12) {
      console.log("Contains morning slots");
    }
    if (+this.endTimeOne >= 12) {
      console.log("Contains afternoon slots");
    }
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
    this.tempTimings.push(sendRes);

    if (sendRes) {
      this.generateSlots(sendRes);
    }
  }

  generateMorningNAfternoonSlots(startTime, endTime, maxTime, iteration) {
    let splitStartTime = startTime.split(":");
    let startOne = +splitStartTime[0];
    let startTwo = splitStartTime[1];

    let splitEndTime = endTime.split(":");
    let endOne = +splitEndTime[0];
    let endTwo = splitEndTime[1];

    let generateOne = startOne;
    let generateTwo = startTwo;

    let sendRes;

    if (startOne < maxTime) {
      if (iteration > 1) {
        if (startOne == endOne) {
          if (startTwo == endTwo) {
            return false;
          } else {
            if (startTwo == "00") {
              generateTwo = "30";
            } else {
              generateOne = generateOne + 1;
              generateTwo = "00";
            }
          }
        } else {
          if (startTwo == "00") {
            generateTwo = "30";
          } else {
            generateOne = ++generateOne;
            generateTwo = "00";
          }
        }
      }

      if (generateOne < maxTime) {
        sendRes = generateOne.toString() + ":" + generateTwo.toString();
        this.tempTimings.push(sendRes);

        if (sendRes) {
          this.generateMorningNAfternoonSlots(
            sendRes,
            endTime,
            maxTime,
            ++iteration
          );
        }
      }
    }
  }

  selectSlot = (period, time) => {
    console.log("Slot selected for ->" + period + " - " + time);
    this.router.navigate(["/consultation-details"]);
  };
}
