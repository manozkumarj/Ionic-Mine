import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.page.html',
  styleUrls: ['./vitals.page.scss'],
})
export class VitalsPage implements OnInit {
  vitalForm: FormGroup;

  benIds: any[] = [];
  doctorBpSystolic = -1;
  doctorBpDiastolic = -1;
  muac = 0.0;
  hc = 0.0;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService) {
    this.loadBeneficiaries();

    this.vitalForm = new FormGroup({
      benificiaryId: new FormControl("", Validators.required),
      height: new FormControl("", Validators.required),
      weight: new FormControl("", Validators.required),
      bmi: new FormControl("", Validators.required),
      temperature: new FormControl("", Validators.required),
      pulse: new FormControl("", Validators.required),
      bpSystolic: new FormControl("", Validators.required),
      bpDiastolic: new FormControl("", Validators.required),
      respiratoryRate: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
  }

  loadBeneficiaries() {

  }

  resetValues() {
    this.vitalForm.patchValue({
      height: "",
      weight: "",
      bmi: "",
      temperature: "",
      pulse: "",
      bpSystolic: "",
      bpDiastolic: "",
      respiratoryRate: ""
    });
  }


  onSubmit(values) {
    console.log("Vital form is submitted, below are the values");
    console.log(values);

    let benificiaryId = this.vitalForm.get("benificiaryId").value.trim();
    let height = this.vitalForm.get("height").value.trim();
    let weight = this.vitalForm.get("weight").value.trim();
    let bmi = this.vitalForm.get("bmi").value.trim();
    let temperature = this.vitalForm.get("temperature").value.trim();
    let pulse = this.vitalForm.get("pulse").value.trim();
    let bpSystolic = this.vitalForm.get("bpSystolic").value.trim();
    let bpDiastolic = this.vitalForm.get("bpDiastolic").value.trim();
    let respiratoryRate = this.vitalForm.get("respiratoryRate").value.trim();


    if (!benificiaryId || benificiaryId <= 0) {
      alert("Please Select Beneficiary ID");
      return false;
    }
    if (!height || height == null) {
      alert("Enter Beneficiary height");
      return false;
    }
    if (!weight || weight == null) {
      alert("Enter Beneficiary weight");
      return false;
    }
    if (!bmi || bmi == null) {
      alert("Enter Beneficiary bmi");
      return false;
    }
    if (!temperature || temperature == null) {
      alert("Enter Beneficiary temperature");
      return false;
    }
    if (!pulse || pulse == null) {
      alert("Enter Beneficiary pulse");
      return false;
    }
    if (!bpSystolic || bpSystolic == null) {
      alert("Enter Beneficiary bpSystolic");
      return false;
    }
    if (!bpDiastolic || bpDiastolic == null) {
      alert("Enter Beneficiary bpDiastolic");
      return false;
    }
    if (!respiratoryRate || respiratoryRate == null) {
      alert("Enter Beneficiary respiratoryRate");
      return false;
    }

  }

}
