import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-search-beneficiary',
  templateUrl: './search-beneficiary.page.html',
  styleUrls: ['./search-beneficiary.page.scss'],
})
export class SearchBeneficiaryPage implements OnInit {

  searchBenForm: FormGroup;
  beneficiaries: any[] = [
    {
      imageUrl: 'assets/profile_pic.jpg',
      patientId: 'SP0002000002B00TEST',
      name: 'test',
      surname: 'jumbo',
      gender: 'Female',
      age: 25
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
        this.beneficiaries = beneficiaries;
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaries() function returned error." +
          JSON.stringify(error)
        );
      });
  }

}
