import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-beneficiary-history",
  templateUrl: "./beneficiary-history.page.html",
  styleUrls: ["./beneficiary-history.page.scss"]
})
export class BeneficiaryHistoryPage implements OnInit {
  benHistoryForm: FormGroup;
  selectedBenId = 0;
  selectedHistoryId = 0;

  measurementDetails_headings = [
    "Date of Visit",
    "BP",
    "Pulse",
    "Temperature",
    "RR",
    "Height",
    "Weight",
    "BMI"
  ];
  benCategoryAndReferral_headings = [
    "Visit Date",
    "Beneficiary Category",
    "Referral"
  ];
  labTestsAndAnswers_headings = ["Visit Date", "Test Name", "Result"];
  medicinesDispensation_headings = ["Issued ID", "Name", "Quantity Given"];

  results: any[] = [
    {
      visitDate: "2019-12-29",
      testName: "test",
      result: "jumbo"
    }
  ];

  historyTypes: any[] = [
    {
      value: 1,
      name: "Measurement Details"
    },
    {
      value: 2,
      name: "Beneficiary category & Referral"
    },
    {
      value: 3,
      name: "Labtests & Answers"
    },
    {
      value: 4,
      name: "Medicines Dispensation"
    }
  ];

  headings = this.measurementDetails_headings;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.benHistoryForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      beneficiaryHistory: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    // this.loadBeneficiaries();
  }

  onChange() {
    let selectedBenId = this.benHistoryForm.get("beneficiaryId").value;
    let selectedHistoryId = this.benHistoryForm.get("beneficiaryHistory").value;

    if (!selectedBenId || selectedBenId <= 0) {
      alert("Please select Beneficiary ID");
      return false;
    }
    if (!selectedHistoryId || selectedHistoryId <= 0) {
      console.log("History type is not selected");
      return false;
    }

    this.onSubmit(selectedBenId, selectedHistoryId);
  }

  loadBeneficiaries() {
    this.db
      .getBeneficiaries()
      .then(beneficiaries => {
        console.log(
          "Fetched beneficiaries -> " + JSON.stringify(beneficiaries)
        );
        this.results = beneficiaries;
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaries() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  onSubmit(patientId, selectedHistoryId) {
    console.clear();
    console.log("Ben History form is submitted, below are the values");
    console.log(this.benHistoryForm.value);

    alert("Form can be submitted");

    if (selectedHistoryId == 1) {
      this.headings = this.measurementDetails_headings;
    } else if (selectedHistoryId == 2) {
      this.headings = this.benCategoryAndReferral_headings;
    } else if (selectedHistoryId == 3) {
      this.headings = this.labTestsAndAnswers_headings;
    } else if (selectedHistoryId == 4) {
      this.headings = this.medicinesDispensation_headings;
    }
  }
}
