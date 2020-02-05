import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { CommonService } from "./../../services/common.service";
import { Router } from "@angular/router";
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.page.html',
  styleUrls: ['./lab-test.page.scss'],
})
export class LabTestPage implements OnInit, OnDestroy {
  @ViewChild('mySelect', { static: false }) selectRef: IonSelect;
  labTestForm: FormGroup;
  benIds: any[] = [];
  selectedLabTests: any[] = [];
  ecgs: any[] = [];
  labTests: any[] = [];
  dummyLabTests: any[] = [
    {
      labTestId: 1,
      labTestName: 'Urine-Albumin',
      validValues: 'Select~Nil~Trace~1+~2+~3+',
      units: 'null',
      result: ''
    },
    {
      labTestId: 2,
      labTestName: 'Urine-Sugar',
      validValues: 'Select~Nil~1+~2+~3+',
      units: 'null',
      result: ''
    },
    {
      labTestId: 3,
      labTestName: 'HB %',
      validValues: '4--18',
      units: 'gm/100ml',
      result: ''
    }
  ];

  visitCount: number;
  stateId: number;
  districtId: number;
  mandalId: number;
  villageId: number;
  servicePointId: number;
  servicePointName: string;
  servicePointCode: string;

  showLabTests: boolean = true;

  newDate = new Date();
  dateTime: string = this.commonService.getDateTime(this.newDate);

  constructor(
    private db: DatabaseService,
    private commonService: CommonService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.loadSessionDetails();
    // this.loadBeneficiaries();
    // loadLabTests();
    // loadEcgs();

    this.labTestForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {

    console.clear();
    // console.log("1st Logging this.dummyLabTests");
    // console.log(this.dummyLabTests);

    this.labTests = this.dummyLabTests.map(labtest => ({
      ...labtest,
      input: labtest['validValues'].toLowerCase().includes('select') ? 'select' : 'input',
      options: (labtest['validValues'].split("~")).filter(l => l != 'Select')
    })
    );

    console.log("Logging this.labTests");
    console.log(this.labTests);

  }

  ngOnDestroy() {
    console.log("ngOnDestroy triggered...");
    this.commonService.makeBenObjectEmpty();
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

  loadEcgs() {
    this.db
      .getEcgs()
      .then(ecgs => {
        console.log(
          "Fetched ecgs -> " + JSON.stringify(ecgs)
        );
        this.ecgs = ecgs;
      })
      .catch(error => {
        console.error(
          "Error -> getEcgs() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadSessionDetails() {
    this.stateId = this.commonService.sessionDetails['stateId'];
    this.districtId = this.commonService.sessionDetails['districtId'];
    this.mandalId = this.commonService.sessionDetails['mandalId'];
    this.villageId = this.commonService.sessionDetails['villageId'];
    this.servicePointId = this.commonService.sessionDetails['servicePointId'];
    this.servicePointName = this.commonService.sessionDetails['servicePointName'];
    this.servicePointCode = this.commonService.sessionDetails['servicePointCode'];
  }

  benIdChange() {
    let selectedBenID = this.labTestForm.get("beneficiaryId").value;
    console.log("selectedBenID is -> " + selectedBenID);
    this.showLabTests = true;
  }

  labTestChange(val) {
    console.log("selected val is -> " + val);
    this.selectedLabTests.push(val);
    let filtered = this.dummyLabTests.filter(labTest => !this.selectedLabTests.includes(labTest.id));

    console.log("filtered labtests are -> " + JSON.stringify(filtered));

    this.labTests = filtered;

  }

  openSelect() {
    this.selectRef.open();
  }

  closeSelect() {
    // this.selectRef.close();
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

    let visitId = this.commonService.beneficiaryDetails['userVisitId'];
    let deviceId = this.commonService.beneficiaryDetails['userDeviceId'];
    let vanId = this.commonService.beneficiaryDetails['userVanId'];
    let routeVillageId = this.commonService.beneficiaryDetails['userRouteVillageId'];
    let servicePointId = this.commonService.beneficiaryDetails['userServicePointId'];
    let compoundPatientId = this.commonService.beneficiaryDetails['userCompoundPatientId'];
    let visitCount = this.commonService.beneficiaryDetails['userVisitCount'];

    let userId = this.commonService.userDetails['userId'];
  }

}
