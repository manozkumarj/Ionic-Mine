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
  }

}
