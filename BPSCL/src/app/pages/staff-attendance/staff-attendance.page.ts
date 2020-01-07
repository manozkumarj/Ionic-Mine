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
  adminUsers: any[] = [];

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.staffAttendanceForm = new FormGroup({
      sessionType: new FormControl("", Validators.required),
      staffName: new FormControl("", Validators.required),
      staffDesignation: new FormControl("", Validators.required)
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
        console.log("Fetched states -> " + JSON.stringify(sessionTypes));
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
        this.adminUsers = users;
        console.log("Total No. of users = " + users.length);
        console.log("Total users are ==> " + JSON.stringify(users));
      })
      .catch(error => {
        console.error("Database Error " + JSON.stringify(error));
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
