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

  userId: number;
  vanId: number;
  deviceId: number;
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
    this.loadUserDetails();
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

  resultChange(id, result, input = null, values = null) {
    console.log(`resultChange - id is ${id} & result is ${result}`);
    console.log("input is --> " + input);
    console.log("values is --> " + values);
    if (id && id != '') {
      if (input && values && values != 'null') {
        let getMinMax = values.split('--');
        console.log("getMinMax array is --> " + JSON.stringify(getMinMax));
        let min = getMinMax[0];
        let max = getMinMax[1];

        if (result < min || result > max) {
          alert(`${this.labTests[id]['labTestName']} result should be between ${min} to ${max}`);
          this.labTests[id]['result'] = null;
          return false;
        }

      }

      this.labTests[id]['result'] = result;
    }
  }

  loadUserDetails() {
    this.storageService
      .getObject("userDetails")
      .then(data => {
        console.log("User details are -> " + JSON.stringify(data));
        this.userId = data.userId;
        this.vanId = data.vanId;
        this.deviceId = data.deviceId;
      })
      .catch(error => {
        console.error("User details were not set -> " + JSON.stringify(error));
      });
  }

  loadSessionDetails() {
    this.storageService
      .getObject("sessionDetails")
      .then(data => {
        console.log("Session Details are -> " + JSON.stringify(data));

        this.stateId = data["stateId"];
        this.districtId = data["districtId"];
        this.mandalId = data["mandalId"];
        this.villageId = data["villageId"];
        this.servicePointName = data["servicePointName"];
        this.servicePointCode = data["servicePointCode"];
        this.servicePointId = data["servicePointId"];
      })
      .catch(error => {
        console.error(
          "Session Details were not set -> " + JSON.stringify(error)
        );
      });
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


  findAndUpsertLabTest(
    patientId,
    visitId,
    deviceId,
    vanId,
    routeVillageId,
    servicePointId,
    compoundPatientId,
    visitCount,
    labTestId,
    labTestResult,
    userId
  ) {
    let dataObject = {
      patientId,
      visitId,
      deviceId,
      vanId,
      routeVillageId,
      servicePointId,
      compoundPatientId,
      visitCount,
      labTestId,
      labTestResult,
      userId
    };

    this.db
      .findBenLabtest(dataObject)
      .then(data => {
        if (data) {
          // Need to update the Dispense
          this.db
            .updateLabtest(dataObject)
            .then(data => {
              console.log(
                "Success -> updateLabtest is updated Successfully..." + data
              );
            })
            .catch(e => {
              console.error(
                "Error -> updateLabtest is not updated" + JSON.stringify(e)
              );
            });
        } else {
          // Need to insert the Dispense
          this.db
            .insertLabtest(dataObject)
            .then(data => {
              console.log(
                "Success -> insertLabtest is inserted Successfully..." + data
              );
            })
            .catch(e => {
              console.error(
                "Error -> insertLabtest is not inserted" + JSON.stringify(e)
              );
            });
        }
      })
      .catch(e => {
        console.error(
          "Error -> findDispense returned error" + JSON.stringify(e)
        );
      });
  }


  onSubmit(values) {
    console.clear();
    console.log("Lab Tests form is submitted, below are the values");
    console.log(values);

    let patientId = this.labTestForm.get("beneficiaryId").value;

    if (!patientId || patientId <= 0) {
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


    let userId = this.userId;
    let vanId = this.vanId;
    let servicePointId = this.servicePointId;
    let deviceId = this.deviceId;

    let visitId = this.commonService.beneficiaryDetails["userVisitId"];
    let routeVillageId = this.commonService.beneficiaryDetails[
      "userRouteVillageId"
    ];
    let compoundPatientId = this.commonService.beneficiaryDetails[
      "userCompoundPatientId"
    ];
    let visitCount = this.commonService.beneficiaryDetails["userVisitCount"];

    console.log("selectedLabTests are showing below");
    console.log(selectedLabTests);

    console.log(
      patientId +
      " *** " +
      routeVillageId +
      " *** " +
      compoundPatientId +
      " *** " +
      visitId +
      " *** " +
      servicePointId +
      " *** " +
      vanId +
      " *** " +
      userId +
      " *** " +
      visitCount
    );

    console.log("**********************************************");

    for (let i = 0; i < selectedLabTests.length; i++) {

      let labTestId = selectedLabTests[i]["labTestId"];
      let result = selectedLabTests[i]["result"];
      console.log("labTestId --> " + labTestId);
      console.log("result is --> " + result);

      console.log("-----------------------------------");

      this.findAndUpsertLabTest(
        patientId,
        visitId,
        deviceId,
        vanId,
        routeVillageId,
        servicePointId,
        compoundPatientId,
        visitCount,
        labTestId,
        result,
        userId
      );

    }

  }

}
