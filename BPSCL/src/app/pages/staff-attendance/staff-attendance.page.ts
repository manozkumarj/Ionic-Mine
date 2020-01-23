import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-staff-attendance",
  templateUrl: "./staff-attendance.page.html",
  styleUrls: ["./staff-attendance.page.scss"]
})
export class StaffAttendancePage implements OnInit {
  staffAttendanceForm: FormGroup;
  sessionTypes: any[] = [
    {
      sessionTypeId: 1,
      sessionTypeName: "AAA"
    },
    {
      sessionTypeId: 2,
      sessionTypeName: "BBB"
    },
    {
      sessionTypeId: 3,
      sessionTypeName: "CCC"
    }
  ];

  sessionPeriods: any[] = [];

  selectedUserId: number;

  users: any[] = [
    {
      userId: 1,
      username: "AAA"
    },
    {
      userId: 2,
      username: "BBB"
    },
    {
      userId: 3,
      username: "CCC"
    }
  ];

  newDate = new Date();
  dateTime: string = this.commonService.getDateTime(this.newDate);

  servicePointName: string = this.commonService.sessionDetails[
    "servicePointName"
  ];

  showSessionPeriodField: boolean = false;

  constructor(
    private db: DatabaseService,
    private commonService: CommonService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.staffAttendanceForm = new FormGroup({
      sessionType: new FormControl("", Validators.required),
      sessionPeriod: new FormControl(""),
      staffName: new FormControl("", Validators.required),
      staffDesignation: new FormControl({ value: "", disabled: true })
    });
  }

  ngOnInit() {
    // this.getSessionTypes();
    // this.loadUsers();
  }

  getSessionTypes() {
    this.db
      .getSessionTypes()
      .then(sessionTypes => {
        console.log("Fetched sessionTypes -> " + JSON.stringify(sessionTypes));
        this.sessionTypes = sessionTypes;
      })
      .catch(error => {
        console.error(
          "Error -> getSessionTypes() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadUsers() {
    this.db
      .getUsers()
      .then(users => {
        this.users = users;
        console.log("Total No. of users = " + users.length);
        console.log("Total users are ==> " + JSON.stringify(users));
      })
      .catch(error => {
        console.error("Database Error " + JSON.stringify(error));
      });
  }

  usernameChange() {
    let selectedUserID = this.staffAttendanceForm.get("staffName").value;
    console.log("selectedUserID is -> " + selectedUserID);
    // if (selectedUserID && selectedUserID != null)
    //   this.getUserDetails(selectedUserID);

    // delete below lines after enabling above lines
    this.staffAttendanceForm.patchValue({
      staffDesignation: "roleName"
    });
  }

  getUserDetails(selectedUserID) {
    this.selectedUserId = selectedUserID;
    this.db
      .getUserDetails(selectedUserID)
      .then(userDetails => {
        console.log(
          "Received User details are -> " + JSON.stringify(userDetails)
        );
        this.staffAttendanceForm.patchValue({
          staffDesignation: userDetails["roleName"]
        });
      })
      .catch(error => {
        console.error(
          "Error -> getUserDetails() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  sessionTypeChange() {
    let selectedsessionTypeID = this.staffAttendanceForm.get("sessionType")
      .value;
    console.log("selectedsessionTypeID is -> " + selectedsessionTypeID);
    // if (selectedsessionTypeID && selectedsessionTypeID != null)
    //   this.getSessionPeriods(selectedsessionTypeID);

    // delete below lines after enabling above lines
    this.sessionPeriods = [
      {
        sessionPeriodId: 1,
        sessionPeriodName: "pAAA"
      },
      {
        sessionPeriodId: 2,
        sessionPeriodName: "pBBB"
      },
      {
        sessionPeriodId: 3,
        sessionPeriodName: "pCCC"
      }
    ];

    this.showSessionPeriodField = true;
  }

  getSessionPeriods(selectedsessionTypeID) {
    this.db
      .getSessionPeriods(selectedsessionTypeID)
      .then(sessionPeriods => {
        console.log(
          "Received SessionPeriods are -> " + JSON.stringify(sessionPeriods)
        );
        this.sessionPeriods = sessionPeriods;
      })
      .catch(error => {
        console.error(
          "Error -> getSessionPeriods() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  resetValues() {
    this.staffAttendanceForm.patchValue({
      sessionType: "",
      staffName: "",
      staffDesignation: ""
    });
  }

  onSubmit(values) {
    console.log("Staff Attendance form is submitted, below are the values");
    console.log(values);

    let sessionTypeId = this.staffAttendanceForm.get("sessionType").value;
    let sessionPeriodId = this.staffAttendanceForm.get("sessionPeriod").value;
    let staffName = this.staffAttendanceForm.get("staffName").value;
    let staffDesignation = this.staffAttendanceForm
      .get("staffDesignation")
      .value.trim();

    if (!sessionTypeId || sessionTypeId <= 0) {
      alert("Please Select Session Type");
      return false;
    }
    if (!staffName || staffName <= 0) {
      alert("Please Select Staff Name");
      return false;
    }
    if (!staffDesignation || staffDesignation == null) {
      alert("Please Enter Staff Designation");
      return false;
    }

    alert("Form can be submitted");

    let userId = this.commonService.userDetails["userId"];
    let deviceId = this.commonService.beneficiaryDetails["userDeviceId"];
    let vanId = this.commonService.beneficiaryDetails["userVanId"];
    let dateYMD = this.commonService.dateTime;

    let queryData = {
      userId,
      sessionPeriodId,
      sessionTypeId,
      deviceId,
      vanId,
      dateYMD
    };

    this.db
      .findAttendanceId(queryData)
      .then(attendanceId => {

        if (attendanceId && attendanceId > 0) {

          this.db.updateAttendance(queryData).then(data => {
            console.log("Success -> updateAttendance is updated Successfully...");
            this.router.navigate(["/reports"]);
          }).catch(e => {
            console.error("Error -> updateAttendance is not updated" + JSON.stringify(e));
          });

        } else {

          this.db
            .getMaxAttendanceId()
            .then(attendanceId => {
              if (attendanceId) {
                queryData['attendanceId'] = attendanceId;
                this.db
                  .insertAttendance(queryData)
                  .then(data => {
                    console.log("Success - insertAttendance -> " + data);
                    this.router.navigate(["/reports"]);
                  })
                  .catch(error => {
                    console.error(
                      "Error -> insertAttendance() function returned error." +
                      JSON.stringify(error)
                    );
                  });
              }
            })
            .catch(e => {
              console.error(
                "Error -> getMaxAttendanceId returned error" + JSON.stringify(e)
              );
            });

        }

      })
      .catch(e => {
        console.error(
          "Error -> findAttendanceId returned error" + JSON.stringify(e)
        );
      });
  }
}
