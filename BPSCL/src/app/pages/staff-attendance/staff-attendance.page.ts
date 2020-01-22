import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-staff-attendance",
  templateUrl: "./staff-attendance.page.html",
  styleUrls: ["./staff-attendance.page.scss"]
})
export class StaffAttendancePage implements OnInit {
  staffAttendanceForm: FormGroup;
  sessionTypes: any[] = [];

  selectedUseId: number;

  users: any[] = [
    {
      userId: 1,
      username: 'AAA'
    },
    {
      userId: 2,
      username: 'BBB'
    },
    {
      userId: 3,
      username: 'CCC'
    }
  ];

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.staffAttendanceForm = new FormGroup({
      sessionType: new FormControl("", Validators.required),
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
      staffDesignation: 'roleName'
    });
  }

  getUserDetails(selectedUserID) {
    this.selectedUseId = selectedUserID;
    this.db
      .getUserDetails(selectedUserID)
      .then(userDetails => {
        console.log("Received User details are -> " + JSON.stringify(userDetails));
        this.staffAttendanceForm.patchValue({
          staffDesignation: userDetails['roleName']
        });

      })
      .catch(error => {
        console.error(
          "Error -> getUserDetails() function returned error." +
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

    let sessionType = this.staffAttendanceForm.get("sessionType").value;
    let staffName = this.staffAttendanceForm.get("staffName").value;
    let staffDesignation = this.staffAttendanceForm
      .get("staffDesignation")
      .value.trim();

    if (!sessionType || sessionType <= 0) {
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
  }
}
