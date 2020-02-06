import { Component, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-doctor",
  templateUrl: "./doctor.page.html",
  styleUrls: ["./doctor.page.scss"]
})
export class DoctorPage implements OnInit, OnDestroy {
  doctorForm: FormGroup;

  showRemarks: boolean = false;
  benIds: any[] = [];
  hospitals: any[] = [];
  dbRchs: any[] = [];
  rchs: any[] = [];
  cds: any[] = [];
  ncds: any[] = [];
  minorAilments: any[] = [];

  allowOtherCd: boolean = false;
  allowOtherNcd: boolean = false;
  allowOtherMinorAilment: boolean = false;
  allowOtherReferredTo: boolean = false;

  userId: number;
  vanId: number;
  deviceId: number;
  stateId: number;
  districtId: number;
  mandalId: number;
  villageId: number;
  servicePointId: number;
  servicePointName: string;
  servicePointCode: string;

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
    this.loadHospitals();
    this.loadRCHs();
    this.loadProvisionalDiagnosis(1);
    this.loadProvisionalDiagnosis(2);
    this.loadProvisionalDiagnosis(3);

    this.doctorForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      rch: new FormControl("", Validators.required),
      cd: new FormControl("", Validators.required),
      otherCd: new FormControl("", Validators.required),
      ncd: new FormControl("", Validators.required),
      otherNcd: new FormControl("", Validators.required),
      minorAilments: new FormControl("", Validators.required),
      otherMinorAilment: new FormControl("", Validators.required),
      remarks: new FormControl("", Validators.required),
      referredTo: new FormControl("", Validators.required),
      otherReferredTo: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.commonService.makeBenObjectEmpty();
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

  loadHospitals() {
    this.db
      .geReferredTos()
      .then(hospitals => {
        console.log("Fetched hospitals -> " + JSON.stringify(hospitals));
        this.hospitals = hospitals;
      })
      .catch(error => {
        console.error(
          "Error -> geReferredTos() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadProvisionalDiagnosis(category) {
    let categoryName;
    if (category == 1) {
      categoryName = "CDs";
    } else if (category == 2) {
      categoryName = "NCDs";
    } else {
      categoryName = "Minor Ailments";
    }

    this.db
      .getProvisionalDiagnoses(category)
      .then(results => {
        console.log(`Fetched ${categoryName} ->  + ${JSON.stringify(results)}`);
        if (category == 1) {
          this.cds = results;
        } else if (category == 2) {
          this.ncds = results;
        } else {
          this.minorAilments = results;
        }
      })
      .catch(error => {
        console.error(
          "Error -> getProvisionalDiagnosis() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadRCHs() {
    this.db
      .getRCHs()
      .then(rchs => {
        console.log("Fetched RCHs -> " + JSON.stringify(rchs));
        this.dbRchs = rchs;
        this.rchs = rchs;
      })
      .catch(error => {
        console.error(
          "Error -> getRCHs() function returned error." + JSON.stringify(error)
        );
      });
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

  remarksCheckbox(e) {
    if (e.target.checked) {
      this.showRemarks = true;
      this.doctorForm.patchValue({
        cd: null,
        otherCd: "",
        ncd: null,
        otherNcd: "",
        minorAilments: null,
        otherMinorAilment: "",
        remarks: "",
        referredTo: null
      });
      this.allowOtherCd = false;
      this.allowOtherNcd = false;
      this.allowOtherMinorAilment = false;
      console.log("remarksCheckbox is checked");
    } else {
      this.showRemarks = false;
      this.doctorForm.patchValue({
        cd: "",
        otherCd: "",
        ncd: "",
        otherNcd: "",
        minorAilments: "",
        remarks: "N/A",
        otherMinorAilment: "",
        referredTo: ""
      });
      console.log("remarksCheckbox is unchecked");
    }
  }

  cdChange() {
    let selectedCD = this.doctorForm.get("cd").value;
    console.log("selected CD are -> " + JSON.stringify(selectedCD));
    let hasOther = selectedCD.filter(id => id == 12);

    if (hasOther.length > 0) {
      this.allowOtherCd = true;
      console.log("Other option is selected");
    } else {
      this.allowOtherCd = false;
    }
  }

  ncdChange() {
    let selectedNCD = this.doctorForm.get("ncd").value;
    console.log("selected NCD are -> " + JSON.stringify(selectedNCD));
    let hasOther = selectedNCD.filter(id => id == 13);

    if (hasOther.length > 0) {
      this.allowOtherNcd = true;
      console.log("Other option is selected");
    } else {
      this.allowOtherNcd = false;
    }
  }

  minorAilmentChange() {
    let selectedMinorAilment = this.doctorForm.get("minorAilments").value;
    console.log(
      "selected minorAilment are -> " + JSON.stringify(selectedMinorAilment)
    );
    let hasOther = selectedMinorAilment.filter(id => id == 34);

    if (hasOther.length > 0) {
      this.allowOtherMinorAilment = true;
      console.log("Other option is selected");
    } else {
      this.allowOtherMinorAilment = false;
    }
  }

  referredToChange() {
    let selectedReferredTo = this.doctorForm.get("referredTo").value;
    console.log(
      "selected ReferredTo is -> " + JSON.stringify(selectedReferredTo)
    );

    if (selectedReferredTo == 2) {
      this.allowOtherReferredTo = true;
      console.log("Other option is selected");
    } else {
      this.allowOtherReferredTo = false;
    }
  }

  benIdChange() {
    let selectedBenID = this.doctorForm.get("beneficiaryId").value;
    console.log("selectedBenID is -> " + selectedBenID);
    if (selectedBenID && selectedBenID != null)
      this.getBenDetails(selectedBenID);
  }

  getBenDetails(selectedBenID) {
    this.rchs = this.dbRchs;
    this.db
      .getBeneficiaryDetails(selectedBenID)
      .then(benDetails => {
        console.log(
          "Received Ben details are -> " + JSON.stringify(benDetails)
        );

        let benAge = benDetails[0]["age"];
        let benAgeTypeId = benDetails[0]["ageTypeId"];
        let benPregnancyStatus = benDetails[0]["pregnancyStatus"];
        let benGender = benDetails[0]["genderId"];

        console.log("Ben genderId -> " + benGender);

        this.commonService.setBenDetails(benDetails[0]);

        if (benGender == 2) {
          if (benAge >= 16 && benAgeTypeId == 3) {
            if (benPregnancyStatus == 1) {
              this.doctorForm.patchValue({ rch: 1 });
            } else if (benPregnancyStatus == 2) {
              this.doctorForm.patchValue({ rch: 2 });
            }
          }
        } else if (benAge >= 1 && benAge <= 5 && benAgeTypeId == 3) {
          this.doctorForm.patchValue({ rch: 5 });
        } else if (benAge >= 1 && benAge <= 30 && benAgeTypeId == 1) {
          this.doctorForm.patchValue({ rch: 3 });
        } else if (benAge >= 1 && benAge <= 12 && benAgeTypeId == 2) {
          this.doctorForm.patchValue({ rch: 4 });
        } else {
          this.rchs.length = 0;
        }

        let pickedRch = this.doctorForm.get("rch").value;
        console.log("pickedRch -> " + pickedRch);
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaryDetails() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  resetValues() {
    this.doctorForm.patchValue({
      beneficiaryId: "",
      rch: "",
      cd: null,
      otherCd: "",
      ncd: null,
      otherNcd: "",
      minorAilments: null,
      otherMinorAilment: "",
      remarks: "",
      referredTo: null,
      otherReferredTo: ""
    });
    this.allowOtherCd = false;
    this.allowOtherNcd = false;
    this.allowOtherMinorAilment = false;
    this.allowOtherReferredTo = false;
    // this.showRemarks = false;
  }

  onSubmit(values) {
    console.clear();
    console.log("Doctor form is submitted, below are the values");
    console.log(values);

    let patientId = this.doctorForm.get("beneficiaryId").value;
    let rch = this.doctorForm.get("rch").value;
    let cds = this.doctorForm.get("cd").value;
    let otherCd = this.doctorForm.get("otherCd").value.trim();
    let ncds = this.doctorForm.get("ncd").value;
    let otherNcd = this.doctorForm.get("otherNcd").value.trim();
    let minorAilments = this.doctorForm.get("minorAilments").value;
    let otherMinorAilment = this.doctorForm
      .get("otherMinorAilment")
      .value.trim();
    let remarks = this.doctorForm.get("remarks").value.trim();
    let referralTypeId = this.doctorForm.get("referredTo").value;
    let otherPhc = this.doctorForm.get("otherReferredTo").value.trim();

    let remarksArray;

    if (!patientId || patientId <= 0) {
      alert("Please Select Beneficiary ID");
      return false;
    }

    if (this.rchs.length != 0) {
      if (!rch || rch.length == 0) {
        alert("Please Select RCH");
        return false;
      }
    }

    if (this.showRemarks === false) {
      remarksArray = null;
      if (
        (!cds || cds.length == 0) &&
        (!ncds || ncds.length == 0) &&
        (!minorAilments || minorAilments.length == 0) &&
        (!referralTypeId || referralTypeId.length == 0)
      ) {
        alert(
          "Please select at least one of CD or NCD or Minor Ailment or ReferredTo. Otherwise enter Remarks."
        );
        return false;
      }

      if (this.allowOtherCd && otherCd == "") {
        alert("Please Enter CD other details.");
        return false;
      }
      if (this.allowOtherNcd && otherNcd == "") {
        alert("Please Enter NCD other details.");
        return false;
      }
      if (this.allowOtherMinorAilment && otherMinorAilment == "") {
        alert("Please Enter Minor Ailment other details.");
        return false;
      }
      if (this.allowOtherReferredTo && otherPhc == "") {
        alert("Please Enter ReferredTo other details.");
        return false;
      }
    } else {
      remarksArray = [-1];
      if (!remarks || remarks == null) {
        alert("Please Enter Remarks");
        return false;
      }
    }

    console.log("Form can be submitted");

    let userId = this.userId;
    let deviceId = this.deviceId;
    let vanId = this.vanId;
    let servicePointId = this.servicePointId;

    let visitId = this.commonService.beneficiaryDetails["userVisitId"];
    let routeVillageId = this.commonService.beneficiaryDetails[
      "userRouteVillageId"
    ];
    let compoundPatientId = this.commonService.beneficiaryDetails[
      "userCompoundPatientId"
    ];
    let visitCount = this.commonService.beneficiaryDetails["userVisitCount"];

    let provisionals = [cds, ncds, minorAilments, remarksArray];

    for (let j = 0; j < provisionals.length; j++) {
      let provisionType =
        j == 0 ? "CD" : j == 1 ? "NCD" : j == 2 ? "Minor Ailment" : "Remarks";
      let otherFieldId = j == 0 ? 12 : j == 1 ? 13 : j == 2 ? 34 : null;
      let provision = provisionals[j];
      let otherFieldValue;
      if (j == 0) {
        otherFieldValue = otherCd;
      } else if (j == 1) {
        otherFieldValue = otherNcd;
      } else {
        otherFieldValue = otherMinorAilment;
      }

      if (provision) {
        for (let i = 0; i < provision.length; i++) {
          let provisionalDiagnosisId = provision[i];
          console.log(provisionType + " is --> " + provisionalDiagnosisId);
          let setOtherFieldValue;
          if (otherFieldId && provisionalDiagnosisId == otherFieldId) {
            setOtherFieldValue = otherFieldValue;
          } else {
            setOtherFieldValue = null;
          }

          console.log("setOtherFieldValue is --> " + setOtherFieldValue);

          this.db
            .findProvisionalDiagnose(
              patientId,
              servicePointId,
              vanId,
              provisionalDiagnosisId,
              visitId
            )
            .then(data => {
              if (data) {
                let updateData = {
                  provisionalDiagnosisId,
                  setOtherFieldValue,
                  remarks,
                  userId,
                  patientId,
                  servicePointId,
                  vanId,
                  visitId
                };

                this.db
                  .updateProvisionalDiagnose(updateData)
                  .then(data => {
                    console.log(
                      "Success -> ProvisionalDiagnose is updated Successfully..." + data
                    );
                  })
                  .catch(e => {
                    console.error(
                      "Error -> ProvisionalDiagnose is not updated" +
                      JSON.stringify(e)
                    );
                  });
                // Need to update the ProvisionalDiagnose
              } else {
                let insertData = {
                  patientId,
                  visitId,
                  deviceId,
                  vanId,
                  routeVillageId,
                  servicePointId,
                  compoundPatientId,
                  visitCount,
                  provisionalDiagnosisId,
                  setOtherFieldValue,
                  remarks,
                  userId
                };

                this.db
                  .insertProvisionalDiagnose(insertData)
                  .then(data => {
                    console.log(
                      "Success -> ProvisionalDiagnose is inserted Successfully..." + data
                    );
                  })
                  .catch(e => {
                    console.error(
                      "Error -> ProvisionalDiagnose is not inserted" +
                      JSON.stringify(e)
                    );
                  });
                // Need to insert the ProvisionalDiagnose
              }
            })
            .catch(e => {
              console.error(
                "Error -> findProvisionalDiagnose returned error" +
                JSON.stringify(e)
              );
            });
        }
        console.log("*******************");
      }
    }

    if (referralTypeId && referralTypeId != null) {
      let setOtherFieldValue;
      if (referralTypeId == 2) {
        setOtherFieldValue = otherPhc;
      } else {
        setOtherFieldValue = null;
      }

      console.log("referralTypeId is --> " + referralTypeId);
      console.log("setOtherFieldValue is --> " + setOtherFieldValue);

      this.db
        .findReferredTo(patientId, servicePointId, vanId, visitId)
        .then(data => {
          if (data) {
            let updateData = {
              referralTypeId,
              otherPhc,
              remarks,
              userId,
              patientId,
              servicePointId,
              vanId,
              visitId
            };

            this.db
              .updateReferredTo(updateData)
              .then(data => {
                console.log("Success -> ReferredTo is updated Successfully..." + data);
              })
              .catch(e => {
                console.error(
                  "Error -> ReferredTo is not updated" + JSON.stringify(e)
                );
              });
            // Need to update the ReferredTo
          } else {
            let insertData = {
              patientId,
              visitId,
              deviceId,
              vanId,
              routeVillageId,
              servicePointId,
              compoundPatientId,
              visitCount,
              referralTypeId,
              setOtherFieldValue,
              remarks,
              userId
            };

            this.db
              .insertReferredTo(insertData)
              .then(data => {
                console.log(
                  "Success -> ReferredTo is inserted Successfully..." + data
                );
              })
              .catch(e => {
                console.error(
                  "Error -> ReferredTo is not inserted" + JSON.stringify(e)
                );
              });
            // Need to insert the ReferredTo
          }
        })
        .catch(e => {
          console.error(
            "Error -> findReferredTo returned error" + JSON.stringify(e)
          );
        });
    }
    this.router.navigate(["/lab-test"]);
  }
}
