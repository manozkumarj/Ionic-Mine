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

  results: any[] = [
    {
      visitDate: "2019-12-29",
      testName: "test",
      result: "jumbo"
    }
  ];

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
      alert("Please select Beneficiary History");
      return false;
    }

    this.onSubmit(this.benHistoryForm.value);
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

  onSubmit(values) {
    console.log("Ben Registration form is submitted, below are the values");
    console.log(values);

    alert("Form can be submitted");
  }
}
