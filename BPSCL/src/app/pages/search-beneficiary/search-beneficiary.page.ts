import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-search-beneficiary",
  templateUrl: "./search-beneficiary.page.html",
  styleUrls: ["./search-beneficiary.page.scss"]
})
export class SearchBeneficiaryPage implements OnInit {
  searchBenForm: FormGroup;
  beneficiaries: any[] = [];

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.searchBenForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      beneficiaryName: new FormControl("", Validators.required),
      beneficiarySurname: new FormControl("", Validators.required),
      beneficiaryAge: new FormControl("", Validators.required),
      beneficiaryAgeUnit: new FormControl("", Validators.required),
      beneficiaryGender: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    // this.loadBeneficiaries();
  }

  loadBeneficiaries() {
    this.db
      .getBeneficiaries()
      .then(beneficiaries => {
        console.log(
          "Fetched beneficiaries -> " + JSON.stringify(beneficiaries)
        );
        this.beneficiaries = beneficiaries;
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaries() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  onSubmit(values) {
    console.log("Search Ben form is submitted, below are the values");
    console.log(values);

    let beneficiaryId = this.searchBenForm.get("beneficiaryId").value;
    let beneficiaryName = this.searchBenForm
      .get("beneficiaryName")
      .value.trim();
    let beneficiarySurname = this.searchBenForm
      .get("beneficiarySurname")
      .value.trim();
    let beneficiaryAge = this.searchBenForm.get("beneficiaryAge").value;
    let beneficiaryAgeUnit = this.searchBenForm.get("beneficiaryAgeUnit").value;
    let beneficiaryGender = this.searchBenForm.get("beneficiaryGender").value;

    if (
      !beneficiaryId &&
      !beneficiaryName &&
      !beneficiarySurname &&
      !beneficiaryAge &&
      !beneficiaryAgeUnit &&
      !beneficiaryGender
    ) {
      alert("Please fill any one the fields.");
      return false;
    }

    this.beneficiaries = [
      {
        imageUrl: "assets/profile_pic.jpg",
        patientId: "SP0002000002B00TEST",
        name: "test",
        surname: "jumbo",
        gender: "Female",
        age: 25
      }
    ];

    alert("Form can be submitted");
  }
}
