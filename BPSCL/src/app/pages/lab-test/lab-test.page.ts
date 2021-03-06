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
  benIds: any[] = [
    {
      patientId: 'one'
    }, {
      patientId: 'two'
    }, {
      patientId: 'three'
    }, {
      patientId: 'four'
    }, {
      patientId: 'five'
    }
  ];
  selectedLabTests: any[] = [];

  ecgs: any[] = [
    {
      ecgId: 1,
      ecgName: 'Ecg 1',
      referral: 'Yes',
      concatValue: 1 + ',Yes'
    }, {
      ecgId: 2,
      ecgName: 'Ecg 2',
      referral: 'No',
      concatValue: 2 + ',No'
    }, {
      ecgId: 3,
      ecgName: 'Ecg 3',
      referral: 'Yes',
      concatValue: 3 + ',Yes'
    }, {
      ecgId: 4,
      ecgName: 'Ecg 4',
      referral: 'No',
      concatValue: 4 + ',No'
    }
  ];

  labTests: any[] = [
    {
      labTestId: 1,
      orderId: null,
      labTestName: 'Urine-Albumin',
      validValues: 'Select~Nil~Trace~1+~2+~3+',
      units: 'null',
      id: 0,
      intId: 1,
      isSelected: false,
      input: 'select',
      options: ['aaa', 'bbb', 'ccc'],
      result: null,
      showField: false
    },
    {
      labTestId: 2,
      intId: 2,
      orderId: null,
      labTestName: 'Urine-Sugar',
      validValues: 'Select~Nil~1+~2+~3+',
      units: 'null',
      id: 1,
      isSelected: false,
      input: 'select',
      result: null,
      showField: false
    },
    {
      labTestId: 3,
      intId: 3,
      orderId: null,
      labTestName: 'HB %',
      validValues: '4--18',
      units: 'gm/100ml',
      id: 2,
      isSelected: false,
      input: 'input',
      result: null,
      showField: false
    },
    {
      labTestId: 9,
      intId: 4,
      orderId: null,
      id: 3,
      labTestName: 'Fasting Blood Sugar',
      validValues: '60--500',
      units: 'mg%',
      result: null,
      showField: false
    },
    {
      labTestId: 10,
      intId: 5,
      orderId: null,
      id: 4,
      labTestName: 'Post Lunch Blood Sugar',
      validValues: '100--500',
      units: 'mg%',
      result: null,
      showField: false
    },
    {
      labTestId: 12,
      intId: 6,
      orderId: null,
      id: 5,
      labTestName: 'RBS',
      validValues: '60--500',
      units: 'mg%',
      result: null,
      showField: false
    },
    {
      labTestId: 14,
      intId: 7,
      orderId: null,
      id: 6,
      labTestName: 'Pregnancy Confirmation',
      validValues: 'Select~Negative~Positive',
      units: 'null',
      result: null,
      showField: false
    },
    {
      labTestId: 17,
      intId: 8,
      orderId: null,
      id: 7,
      labTestName: 'Others',
      validValues: 'null',
      units: 'null',
      result: null,
      showField: false
    },
    {
      labTestId: 18,
      intId: 9,
      orderId: null,
      id: 8,
      labTestName: 'Malaria',
      validValues: 'Select~Negative~Positive',
      units: 'null',
      result: null,
      showField: false
    },
    {
      labTestId: 11,
      intId: 10,
      orderId: null,
      id: 9,
      labTestName: 'ECG',
      validValues: 'Select~No~Yes',
      units: '',
      options: ['Yes', 'No'],
      isSelected: false,
      input: 'select',
      result: null,
      showField: false
    }
  ];

  copyOfLabTests: any[] = this.labTests;

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

  selectedEcgName: string;
  selectedEcgReferral: string;
  selectedEcgId: number;

  showLabTests: boolean = false;
  showEcgSection: boolean = false;
  showLabTestSelectorSection: boolean = false;

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
    this.loadBeneficiaries();
    this.loadLabTests();
    this.loadEcgs();

    this.labTestForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      labTestSelector: new FormControl("", Validators.required),
      ecgSelector: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.commonService.makeBenObjectEmpty();
  }

  ngOnDestroy() {
    console.log("ngOnDestroy triggered...");
    this.commonService.makeBenObjectEmpty();
  }

  openSelect() {
    this.selectRef.open();
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

        let i = 0;
        let j = 1;
        this.labTests = labTests.map(labtest => ({
          ...labtest,
          id: i++,
          orderId: j++,
          isSelected: false,
          input: labtest['validValues'].toLowerCase().includes('select') ? 'select' : 'input',
          options: (labtest['validValues'].split("~")).filter(l => l != 'Select'),
          result: null,
          intId: j++,
          showField: false
        })
        );
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

  resultChange(labTestId, id, result, input = null, values = null, fromSubmit = false) {
    console.log(`resultChange - labTestId is ${labTestId} & id is ${id} & result is ${result}`);
    console.log("input is --> " + input);
    console.log("values is --> " + values);
    if (input && input == 'input' && values && values != 'null') {
      result = +result;
      let getMinMax = values.split('--');
      console.log("getMinMax array is --> " + JSON.stringify(getMinMax));
      let min = +getMinMax[0];
      let max = +getMinMax[1];

      if (result < min || result > max) {
        alert(`'${this.labTests[id]['labTestName']}' result should be between ${min} to ${max}`);
        this.labTests[id]['result'] = result;
        return false;
      }
    }

    // Since 'ECG' labTest ID is 11 - so we are comparing with 11
    if (labTestId == 11) {
      if (result.toLowerCase() == 'yes') {
        if (!fromSubmit || !this.selectedEcgId) {
          this.selectRef.open();
        }
      } else {
        this.selectedEcgName = null;
        this.selectedEcgReferral = null;
        this.selectedEcgId = null;
        this.showEcgSection = false;
      }
    }

    this.labTests[id]['result'] = result;
    return true;
  }

  selectedLabTestId(selectedLabTestID) {
    let selectedIntId = selectedLabTestID;
    console.log("selectedIntId is -> " + selectedIntId);
    if (selectedLabTestID) {
      selectedLabTestID = --selectedLabTestID;
      this.selectedLabTests.push(selectedLabTestID);
      let getSelectedLabTestsCount = this.selectedLabTests.length;
      // let selectedLabTestID = +this.labTestForm.get("labTestSelector").value;
      this.labTests[selectedLabTestID]['showField'] = true;
      this.labTests[selectedLabTestID]['orderId'] = getSelectedLabTestsCount;
      let id = this.labTests[selectedLabTestID]['id'];
      let name = this.labTests[selectedLabTestID]['labTestName'];
      this.labTestForm.patchValue({
        labTestSelector: null
      });

      this.copyOfLabTests = this.copyOfLabTests.filter(labTest => {
        return labTest.intId != selectedIntId
      });

      this.labTestSelection(id, name);

      if (this.copyOfLabTests.length === 0) {
        this.showLabTestSelectorSection = false;
      } else {
        this.showLabTestSelectorSection = true;
      }

      // let cloneOfLabTests = [...this.labTests];
      // this.labTests = [...cloneOfLabTests];

      console.log("selectedLabTestId() Logging this.labTests");
      console.log(this.labTests);
      // return false;
    }
  }

  ecgSelection(id) {
    console.log("selected ECG is -> " + id);
    // this.showEcgSection = true;
    // let splitValue = ecgValue.split(',');
    // let id = splitValue[0];
    // let referral = splitValue[1];
    // console.log("id is -> " + id + " & referral is -> " + referral);

    let selectedEcgElement = this.ecgs.find(ecg => ecg.ecgId == id);

    console.log(selectedEcgElement);

    this.selectedEcgName = selectedEcgElement['ecgName'];
    this.selectedEcgReferral = selectedEcgElement['referral'];
    this.selectedEcgId = id;

    this.showEcgSection = true;
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
    this.showLabTestSelectorSection = true;
    // Un-comment below two lines when go live
    if (selectedBenID && selectedBenID != null)
      this.getBenDetails(selectedBenID);
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

  skipper() {
    console.clear();
    console.log("Skip button clicked...");
    let selectedBenID = this.labTestForm.get("beneficiaryId").value;
    console.log("Currently selectedBenID is -> " + selectedBenID);

    let skipResponse = this.commonService.skipButtonFunctionality(selectedBenID, this.benIds);

    console.log("skipResponse is -> " + skipResponse);

    if (skipResponse == -1) {
      console.log("Next will be empty");
      console.log("selectable patient ID is -> null");
      this.labTestForm.patchValue({
        beneficiaryId: null
      });
    } else {
      console.log("selectable patient ID is -> " + this.benIds[skipResponse].patientId);
      this.labTestForm.patchValue({
        beneficiaryId: this.benIds[skipResponse].patientId
      });
    }
  }

  resetValues() {
    this.labTestForm.patchValue({
      beneficiaryId: "",
      labTestSelector: null,
      ecgSelector: null
    });

    this.loadBeneficiaries();
    this.loadLabTests();
    this.loadEcgs();

    this.showLabTests = false;
    this.showEcgSection = false;
    this.showLabTestSelectorSection = false;
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
    let ecgId = +this.selectedEcgId;
    let isEcgReferred = this.selectedEcgReferral;

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

    let getLoopStatus = true;
    if (selectedLabTests.length > 0) {
      selectedLabTests.sort((a, b) => {
        return a.orderId - b.orderId;
      });
      for (let labTest of selectedLabTests) {
        let labtestName = labTest['labTestName'];
        let inputType = labTest['input'];
        let id = labTest['id'];
        let labTestId = labTest['labTestId'];
        let result = labTest['result'];
        let validValues = labTest['validValues'];

        let type = (inputType == 'input') ? 'Enter' : 'Select';

        if (!result || result == '') {
          alert(`Please ${type} result for '${labtestName}' labTest`);
          getLoopStatus = false;
          return false;
        } else {
          let getStatus = this.resultChange(labTestId, id, result, inputType, validValues, true);
          console.log("getStatus is -> " + getStatus);
          if (!getStatus) {
            getLoopStatus = false;
            return false;
          }

          if (!getLoopStatus)
            return false;
        }
      }
    }

    if (!getLoopStatus)
      return false;

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
      visitCount +
      " *** " +
      ecgId
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

    if (ecgId && ecgId > 0) {

      let ecgDbData = {
        patientId,
        visitId,
        deviceId,
        vanId,
        routeVillageId,
        servicePointId,
        compoundPatientId,
        visitCount,
        ecgId,
        isEcgReferred,
        userId
      }

      console.log("ecgDbData is below");
      console.log(ecgDbData);

      this.db
        .findEcg(ecgDbData)
        .then(data => {
          if (data) {

            this.db
              .updateEcg(ecgDbData)
              .then(data => {
                console.log("Success -> updateEcg is updated Successfully..." + data);
              })
              .catch(e => {
                console.error(
                  "Error -> updateEcg is not updated" + JSON.stringify(e)
                );
              });

            // Need to update the Ecg
          } else {

            this.db
              .insertEcg(ecgDbData)
              .then(data => {
                console.log(
                  "Success -> insertEcg is inserted Successfully..." + data
                );
              })
              .catch(e => {
                console.error(
                  "Error -> insertEcg is not inserted" + JSON.stringify(e)
                );
              });

            // Need to insert the Ecg
          }

        })
        .catch(e => {
          console.error(
            "Error -> findEcg returned error" + JSON.stringify(e)
          );
        });

    }

    // this.router.navigate(["/medicine-dispense"]);
    console.log("Form is submitted successfully.");
    this.router.navigate(["/medicine-dispense"]);

  }

}
