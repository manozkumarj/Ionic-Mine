import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.page.html",
  styleUrls: ["./reports.page.scss"]
})
export class ReportsPage implements OnInit {
  reportsForm: FormGroup;

  items: any[] = [
    "one",
    "two",
    "three",
    "four",
    "six",
    "seven",
    "eight",
    "nine",
    "ten"
  ];

  beneficiaries: any[] = [
    {
      patientId: "SP000200TEST"
    },
    {
      patientId: "SP000200TEST"
    },
    {
      patientId: "SP000200TEST"
    },
    {
      patientId: "SP000200TEST"
    },
    {
      patientId: "SP000200TEST"
    },
    {
      patientId: "SP000200TEST"
    },
    {
      patientId: "SP000200TEST"
    },
    {
      patientId: "SP000200TEST"
    },
    {
      patientId: "SP000200TEST"
    },
    {
      patientId: "SP000200TEST"
    }
  ];

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.reportsForm = new FormGroup({
      report: new FormControl("", Validators.required),
      fromDate: new FormControl("", Validators.required),
      toDate: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  onSubmit(values, csv = false) {
    console.log("Reports form is submitted, below are the values");
    console.log(values);
    console.log("Is CSV export -> " + csv);

    let report = this.reportsForm.get("report").value;
    let fromDate = this.reportsForm.get("fromDate").value.trim();
    let toDate = this.reportsForm.get("toDate").value.trim();

    if (!report || report <= 0) {
      alert("Please Select Report");
      return false;
    }
    if (!fromDate || fromDate == null) {
      alert("Please Select Start Date");
      return false;
    }
    if (!toDate || toDate == null) {
      alert("Please Select To Date");
      return false;
    }

    if (csv) {
      alert("Export CSV file");
    } else {
      alert("Show details");
    }
  }
}
