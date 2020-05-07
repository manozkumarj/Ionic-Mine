import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-slot-selection",
  templateUrl: "./slot-selection.page.html",
  styleUrls: ["./slot-selection.page.scss"],
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
  allAvailableSlotsNTimings: any[] = [];

  selectedSlotDate: any[] = [];

  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  d = new Date();
  currentMonth = this.d.getMonth() + 1;
  currentYear = this.d.getFullYear();
  todayId = this.d.getDay();
  todayDate = this.d.getDate();
  tomorrowDate = this.d.getDate() + 1;
  todayPlus2sDate = this.d.getDate() + 2;
  todayPlus3sDate = this.d.getDate() + 3;
  todayPlus4sDate = this.d.getDate() + 4;
  todayPlus5sDate = this.d.getDate() + 5;
  todayPlus6sDate = this.d.getDate() + 6;

  tomorrowId = this.todayId < 6 ? this.todayId + 1 : 0;
  todayPlus2daysId = this.tomorrowId < 6 ? this.tomorrowId + 1 : 0;
  todayPlus3daysId = this.todayPlus2daysId < 6 ? this.todayPlus2daysId + 1 : 0;
  todayPlus4daysId = this.todayPlus3daysId < 6 ? this.todayPlus3daysId + 1 : 0;
  todayPlus5daysId = this.todayPlus4daysId < 6 ? this.todayPlus4daysId + 1 : 0;
  todayPlus6daysId = this.todayPlus5daysId < 6 ? this.todayPlus5daysId + 1 : 0;

  threeDigitMonth = this.monthNames[this.d.getMonth()].slice(0, 3);
  threeDigitDayName = this.days[this.d.getDay()].slice(0, 3);

  constructor(private router: Router, private utilities: UtilitiesService) {
    // console.log("todayId -> " + this.todayId + " --> " + this.todayDate);
    // console.log(
    //   "tomorrowId -> " + this.tomorrowId + " --> " + this.tomorrowDate
    // );
    // console.log(
    //   "todayPlus2daysId -> " +
    //     this.todayPlus2daysId +
    //     " --> " +
    //     this.todayPlus2sDate
    // );
    // console.log(
    //   "todayPlus3daysId -> " +
    //     this.todayPlus3daysId +
    //     " --> " +
    //     this.todayPlus3sDate
    // );
    // console.log(
    //   "todayPlus4daysId -> " +
    //     this.todayPlus4daysId +
    //     " --> " +
    //     this.todayPlus4sDate
    // );
    // console.log(
    //   "todayPlus5daysId -> " +
    //     this.todayPlus5daysId +
    //     " --> " +
    //     this.todayPlus5sDate
    // );
    // console.log(
    //   "todayPlus6daysId -> " +
    //     this.todayPlus6daysId +
    //     " --> " +
    //     this.todayPlus6sDate
    // );

    // console.log("todayPlus6sDate -> " + this.todayPlus6sDate);

    this.doctorId = this.utilities.bookAppointmentDoctorDetails["id"];
    this.doctorName = this.utilities.bookAppointmentDoctorDetails["name"];
    this.doctorUsername = this.utilities.bookAppointmentDoctorDetails[
      "username"
    ];
    this.modeId = this.utilities.bookAppointmentDetails["bookableModeId"];
    this.slotName =
      this.modeId == 1
        ? "Video consultation"
        : this.modeId == 2
        ? "Audio consultation"
        : this.modeId == 3
        ? "Chat consultation"
        : "Personal visit";

    // console.log("this.doctorUsername -> " + this.doctorUsername);
    console.log("this.utilities.bookAppointmentDoctorDetails is below");
    console.log(this.utilities.bookAppointmentDoctorDetails);
    console.log("todayDate -> " + this.todayDate);
    console.log("todayId -> " + this.todayId);
    console.log("tomorrowId -> " + this.tomorrowId);
    console.log("threeDigitMonth -> " + this.threeDigitMonth);
    console.log("threeDigitDayName -> " + this.threeDigitDayName);

    let allSlots: any[] = [];
    this.utilities.bookAppointmentDoctorDetails["doctorSlotDetails"].forEach(
      (slot) => {
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
        let clinicId = slot["clinicId"];

        let weekDaysArray = slot["weekDays"].split(",");
        weekDaysArray.forEach((weekDay) => {
          let currentSlot: any[] = [];
          currentSlot["fromTime"] = tempFromTime;
          currentSlot["toTime"] = tempToTime;
          currentSlot["weekDay"] = weekDay;
          currentSlot["clinicId"] = clinicId;
          let nextDate = this.grabDate(weekDay);
          currentSlot["date"] = currentSlot["title"] =
            currentSlot["weekDay"] == this.todayId
              ? "Today"
              : currentSlot["weekDay"] == this.tomorrowId
              ? "Tomorrow"
              : this.days[currentSlot["weekDay"]].slice(0, 3) +
                ", " +
                this.threeDigitMonth +
                " " +
                nextDate;
          currentSlot["dateNtime"] =
            this.currentYear + "-" + this.currentMonth + "-" + nextDate;

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
            ...this.tempTimings,
          ];

          // Morning slots generation
          currentSlot["morningTimings"] = [];
          // currentSlot["morningTimings"].push(currentSlot["fromTime"]);

          this.tempTimings = [];
          this.generateMorningSlots(
            currentSlot["fromTime"],
            currentSlot["toTime"],
            12,
            1
          );

          currentSlot["morningTimings"] = [
            ...currentSlot["morningTimings"],
            ...this.tempTimings,
          ];

          // Afternoon slots generation
          currentSlot["afternoonTimings"] = [];

          this.tempTimings = [];

          // console.log("currentSlot[fromTime] -> " + currentSlot["fromTime"]);
          // console.log("currentSlot[toTime] -> " + currentSlot["toTime"]);

          this.generateAfternoonSlots(
            currentSlot["fromTime"],
            currentSlot["toTime"],
            currentSlot["toTime"].split(":")[0],
            1
          );

          currentSlot["afternoonTimings"] = [
            ...currentSlot["afternoonTimings"],
            ...this.tempTimings,
          ];

          // console.log("All timings showing below ------------");
          // console.log(currentSlot["timings"]);

          // console.log("Morning timings showing below ------------");
          // console.log(currentSlot["morningTimings"]);

          // console.log("Afternoon timings showing below ------------");
          // console.log(currentSlot["afternoonTimings"]);

          // let getIndex = currentSlot["timings"].indexOf("12:00");
          // if (getIndex > -1) {
          //   console.log("Has 12:00 slot");
          // } else {
          //   console.log("Has no 12:00 slot");
          // }

          // console.log("Current slot details below ------------");
          // console.log(currentSlot);
          this.allAvailableSlotsNTimings = [
            ...this.allAvailableSlotsNTimings,
            currentSlot,
          ];
          // console.log("******************************************************");
        });
        this.allAvailableWeekdays = [
          ...this.allAvailableWeekdays,
          ...weekDaysArray,
        ];
      }
    );
    allSlots = allSlots.sort((a, b) => {
      if (a.weekDay > b.weekDay) return 1;
      else return -1;
    });
    // console.log("allSlots is below");
    // console.log(allSlots);

    this.allAvailableSlotsNTimings = this.allAvailableSlotsNTimings.sort(
      (a, b) => {
        if (a.weekDay > b.weekDay) return 1;
        else return -1;
      }
    );
    console.log("allAvailableSlotsNTimings is below");
    console.log(this.allAvailableSlotsNTimings);

    let getIndexOfToday = this.allAvailableSlotsNTimings.findIndex(
      (item) => item.weekDay == this.todayId
    );

    console.log("getIndexOfToday --> " + getIndexOfToday);

    this.allAvailableWeekdays = this.allAvailableWeekdays.sort((a, b) => {
      if (a > b) return 1;
      else return -1;
    });
    // console.log("allAvailableWeekdays below ");
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

    // console.log("allAvailableSlots is below -> ");
    // console.log(this.allAvailableSlots);
  }

  ngOnInit() {
    this.selectedSlotDate = this.allAvailableSlotsNTimings[0];
  }

  grabDate(day) {
    if (day == this.todayId) {
      return this.todayDate;
    } else if (day == this.tomorrowId) {
      return this.tomorrowDate;
    } else if (day == this.todayPlus2daysId) {
      return this.todayPlus2sDate;
    } else if (day == this.todayPlus3daysId) {
      return this.todayPlus3sDate;
    } else if (day == this.todayPlus4daysId) {
      return this.todayPlus4sDate;
    } else if (day == this.todayPlus5daysId) {
      return this.todayPlus5sDate;
    } else if (day == this.todayPlus6daysId) {
      return this.todayPlus6sDate;
    }
  }

  splitSlotTimings(startTime, endTime) {
    let splitStartTime = startTime.split(":");
    this.startTimeOne = splitStartTime[0];
    this.startTimeTwo = splitStartTime[1];

    let splitEndTime = endTime.split(":");
    this.endTimeOne = splitEndTime[0];
    this.endTimeTwo = splitEndTime[1];

    // if (+this.startTimeOne < 12) {
    //   console.log("Contains morning slots");
    // }
    // if (+this.endTimeOne >= 12) {
    //   console.log("Contains afternoon slots");
    // }
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

  generateMorningSlots(startTime, endTime, maxTime, iteration) {
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
          this.generateMorningSlots(sendRes, endTime, maxTime, ++iteration);
        }
      }
    }
  }

  generateAfternoonSlots(startTime, endTime, maxTime, iteration) {
    // console.log("startTime -> " + startTime);
    let splitStartTime = startTime.split(":");
    let startOne = +splitStartTime[0];
    let startTwo = splitStartTime[1];

    let splitEndTime = endTime.split(":");
    let endOne = +splitEndTime[0];
    let endTwo = splitEndTime[1];

    let generateOne = startOne;
    let generateTwo = startTwo;

    let sendRes;

    if (startOne >= 12) {
      if (startOne <= maxTime) {
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

        if (generateOne <= maxTime) {
          sendRes = generateOne.toString() + ":" + generateTwo.toString();
          this.tempTimings.push(sendRes);

          if (sendRes) {
            this.generateAfternoonSlots(sendRes, endTime, maxTime, ++iteration);
          }
        }
      }
    } else {
      generateOne = ++generateOne;
      sendRes = generateOne.toString() + ":" + generateTwo.toString();
      this.generateAfternoonSlots(sendRes, endTime, maxTime, iteration);
    }
  }

  getDateTime(myDate) {
    return (
      myDate.getFullYear() +
      "-" +
      this.padDatePart(myDate.getMonth() + 1) +
      "-" +
      this.padDatePart(myDate.getDate())
    );
  }

  padDatePart(part) {
    return ("0" + part).slice(-2);
  }

  selectSlot = (time, timeNSession) => {
    this.utilities.bookAppointmentDetails["time"] = time;
    this.utilities.bookAppointmentDetails["timeNSession"] = timeNSession;

    let splitNGrabYear = this.selectedSlotDate["dateNtime"].split("-")[0];
    let splitNGrabMonth = this.selectedSlotDate["dateNtime"].split("-")[1];
    let splitNGrabDate = this.selectedSlotDate["dateNtime"].split("-")[2];

    if (splitNGrabMonth.length < 2) splitNGrabMonth = "0" + splitNGrabMonth;
    if (splitNGrabDate.length < 2) splitNGrabDate = "0" + splitNGrabDate;

    this.selectedSlotDate["dateNtime"] =
      splitNGrabYear + "-" + splitNGrabMonth + "-" + splitNGrabDate;

    this.utilities.bookAppointmentDetails["dateNtime"] =
      this.selectedSlotDate["dateNtime"] + " " + time + ":00";

    this.utilities.bookAppointmentDetails["timestamp"] = this.selectedSlotDate[
      "title"
    ];
    this.utilities.bookAppointmentDetails["clinicId"] = this.selectedSlotDate[
      "clinicId"
    ];
    console.log("Slot selected for ->" + time);
    console.log("timeNSession selected for ->" + timeNSession);
    console.log("timestamp selected for ->" + this.selectedSlotDate["title"]);

    console.log("*********************");
    console.log("this.utilities.bookAppointmentDetails are below");
    console.log(this.utilities.bookAppointmentDetails);

    this.router.navigate(["/consultation-details"]);
  };

  selectSlotDate(id) {
    this.selectedSlotDate = this.allAvailableSlotsNTimings[id];
  }
}
