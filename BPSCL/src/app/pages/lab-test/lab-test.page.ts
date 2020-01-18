import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.page.html',
  styleUrls: ['./lab-test.page.scss'],
})
export class LabTestPage implements OnInit {
  labTestForm: FormGroup;
  benIds: any[] = [];
  selectedLabTests: any[] = [];
  labTests: any[] = [
    {
      id: 1,
      name: 'One',
      result: '',
      unit: 'mg%'
    },
    {
      id: 2,
      name: 'Two',
      result: '',
      unit: 'null'
    },
    {
      id: 3,
      name: 'Three',
      result: '',
      unit: 'kms'
    }
  ];

  showLabTests: boolean = false;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService
  ) {
    // this.loadBeneficiaries();
    // loadLabTests();

    this.labTestForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  loadBeneficiaries() {
    this.db
      .getBeneficiaries()
      .then(beneficiaries => {
        console.log(
          "Fetched beneficiaries -> " + JSON.stringify(beneficiaries)
        );
        this.benIds = beneficiaries;
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaries() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadLabTests() {
    this.db
      .getLabTests()
      .then(labTests => {
        console.log(
          "Fetched labTests -> " + JSON.stringify(labTests)
        );
        this.labTests = labTests;
      })
      .catch(error => {
        console.error(
          "Error -> getLabTests() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  benIdChange() {
    let selectedBenID = this.labTestForm.get("beneficiaryId").value;
    console.log("selectedBenID is -> " + selectedBenID);
    this.showLabTests = true;
  }

  resetValues() {
    this.labTestForm.patchValue({
      beneficiaryId: ""
    });
  }


  onSubmit(values) {
    console.clear();
    console.log("Lab Tests form is submitted, below are the values");
    console.log(values);

    let beneficiaryId = this.labTestForm.get("beneficiaryId").value;

    if (!beneficiaryId || beneficiaryId <= 0) {
      alert("Please Select Beneficiary ID");
      return false;
    }

    alert("Form can be submitted");
  }

}
