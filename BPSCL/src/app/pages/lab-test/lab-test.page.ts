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
      units: 'null'
    },
    {
      labTestId: 2,
      labTestName: 'Urine-Sugar',
      validValues: 'Select~Nil~1+~2+~3+',
      units: 'null'
    },
    {
      labTestId: 3,
      labTestName: 'HB %',
      validValues: '4--18',
      units: 'gm/100ml'
    },
    {
      labTestId: 9,
      labTestName: 'Fasting Blood Sugar',
      validValues: '60--500',
      units: 'mg%'
    },
    {
      labTestId: 10,
      labTestName: 'Post Lunch Blood Sugar',
      validValues: '100--500',
      units: 'mg%'
    },
    {
      labTestId: 12,
      labTestName: 'RBS',
      validValues: '60--500',
      units: 'mg%'
    },
    {
      labTestId: 14,
      labTestName: 'Pregnancy Confirmation',
      validValues: 'Select~Negative~Positive',
      units: 'null'
    },
    {
      labTestId: 17,
      labTestName: 'Others',
      validValues: 'null',
      units: 'null'
    },
    {
      labTestId: 18,
      labTestName: 'Malaria',
      validValues: 'Select~Negative~Positive',
      units: 'null'
    },
    {
      labTestId: 11,
      labTestName: 'ECG',
      validValues: 'Select~No~Yes',
      units: ''
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

  showLabTests: boolean = false;

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
    let i = 0;
    this.labTests = this.dummyLabTests.map(labtest => ({
      id: i++,
      ...labtest,
      isSelected: false,
      input: labtest['validValues'].toLowerCase().includes('select') ? 'select' : 'input',
      options: (labtest['validValues'].split("~")).filter(l => l != 'Select'),
      result: null
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

  labTestSelection(id, selectedLabTest) {
    console.log("selectedLabTest is --> " + selectedLabTest);
    if (selectedLabTest && selectedLabTest != '') {
      this.labTests[id]['isSelected'] = true;
    } else {
      this.labTests[id]['isSelected'] = false;
    }

    console.log("labTestSelection() Logging this.labTests");
    console.log(this.labTests);
  }

  resultChange(id, result) {
    console.log(`resultChange - id is ${id} & result is ${result}`);
    if (id && id != '') {
      this.labTests[id]['result'] = result;
    }
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
    // Un-comment below two lines when go live
    // if (selectedBenID && selectedBenID != null)
    //   this.getBenDetails(selectedBenID);
  }

  getBenDetails(selectedBenID) {
    this.db
      .getBeneficiaryDetails(selectedBenID)
      .then(benDetails => {
        // console.log(
        //   "Received Ben details are -> " + JSON.stringify(benDetails)
        // );
        this.commonService.setBenDetails(benDetails[0]);
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaryDetails() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  resetValues() {
    this.labTestForm.patchValue({
      beneficiaryId: ""
    });

    this.labTests = this.labTests.map(labtest => ({
      isSelected: false,
      result: null
    })
    );
    this.showLabTests = false;
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

    console.log("Form can be submitted");
    console.log("submit() Logging this.labTests");
    console.log(this.labTests);

    let selectedLabTests = this.labTests.filter(
      labTest => labTest.isSelected
    );

    if (selectedLabTests.length == 0) {
      alert("Please select atleast one LabTest");
      return false;
    }

    let getErrors = this.labTests.filter(
      labTest => {
        // console.log(labTest.isSelected + '-' + labTest.result);
        return labTest.isSelected && !labTest.result
      }
    );

    console.log("Errors are showing below");
    console.log(getErrors);
    if (getErrors.length > 0) {
      alert("Please Enter/Select result for selected LabTests");
      return false;
    }

    let visitId = this.commonService.beneficiaryDetails['userVisitId'];
    let deviceId = this.commonService.beneficiaryDetails['userDeviceId'];
    let vanId = this.commonService.beneficiaryDetails['userVanId'];
    let routeVillageId = this.commonService.beneficiaryDetails['userRouteVillageId'];
    let servicePointId = this.commonService.beneficiaryDetails['userServicePointId'];
    let compoundPatientId = this.commonService.beneficiaryDetails['userCompoundPatientId'];
    let visitCount = this.commonService.beneficiaryDetails['userVisitCount'];

    let userId = this.commonService.userDetails['userId'];


    console.log("selectedLabTests are showing below");
    console.log(selectedLabTests);

  }

}
