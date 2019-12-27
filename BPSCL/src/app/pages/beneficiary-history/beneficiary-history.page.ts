import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-beneficiary-history',
  templateUrl: './beneficiary-history.page.html',
  styleUrls: ['./beneficiary-history.page.scss'],
})
export class BeneficiaryHistoryPage implements OnInit {

  searchBenForm: FormGroup;
  results: any[] = [
    {
      visitDate: '2019-12-29',
      testName: 'test',
      result: 'jumbo'
    }
  ];

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService) {
    this.searchBenForm = new FormGroup({
      benificiaryName: new FormControl("", Validators.required),
      numberOfFamilyMembers: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    // this.loadBeneficiaries();
  }

  loadBeneficiaries() {
    this.db
      .getBeneficiaries()
      .then(beneficiaries => {
        console.log("Fetched beneficiaries -> " + JSON.stringify(beneficiaries));
        this.results = beneficiaries;
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaries() function returned error." +
          JSON.stringify(error)
        );
      });
  }

}
