import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-medicine-dispense",
  templateUrl: "./medicine-dispense.page.html",
  styleUrls: ["./medicine-dispense.page.scss"]
})
export class MedicineDispensePage implements OnInit {
  medicineDispenseForm: FormGroup;

  showDispenses: boolean = false;
  benIds: any[] = [
    {
      patientId: "a01",
      name: "aaa"
    },
    {
      patientId: "b02",
      name: "bbb"
    }
  ];
  dispenses: any[] = [];
  freshDispenses: any[] = [];

  medicineDispenses: any[] = [
    {
      itemId: 1,
      genericName: "Bandage 6 inch",
      allowQuantity: false,
      quantity: null
    },
    {
      itemId: 2,
      genericName: "Cotton Role 450grm",
      allowQuantity: false,
      quantity: null
    },
    {
      itemId: 3,
      genericName: "Face mask",
      allowQuantity: false,
      quantity: null
    }
  ];

  userId: number;
  vanId: number;
  deviceId: number;
  visitId: number;
  routeVillageId: number;
  compoundPatientId: number;
  visitCount: number;
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
    this.loadSessionDetails();
    // this.loadBeneficiaries();
    // loadDispenses();

    this.medicineDispenseForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      remarks: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  loadSessionDetails() {
    this.stateId = this.commonService.sessionDetails["stateId"];
    this.districtId = this.commonService.sessionDetails["districtId"];
    this.mandalId = this.commonService.sessionDetails["mandalId"];
    this.villageId = this.commonService.sessionDetails["villageId"];
    this.servicePointId = this.commonService.sessionDetails["servicePointId"];
    this.servicePointName = this.commonService.sessionDetails[
      "servicePointName"
    ];
    this.servicePointCode = this.commonService.sessionDetails[
      "servicePointCode"
    ];
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

  loadDispenses() {
    this.db
      .getDispenses(1)
      .then(dispenses => {
        console.log("Fetched Dispenses -> " + JSON.stringify(dispenses));

        this.freshDispenses = dispenses.map(dispense => ({
          ...dispense,
          allowQuantity: false,
          quantity: null
        }));
        this.dispenses = this.freshDispenses;
      })
      .catch(error => {
        console.error(
          "Error -> getDispenses() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  remarksCheckbox(e) {
    if (e.target.checked) {
      this.medicineDispenseForm.patchValue({ remarks: "" });
      this.showDispenses = true;
      console.log("remarksCheckbox is checked");
    } else {
      this.showDispenses = false;
      // this.doctorForm.patchValue({ cd: "", ncd: "", minorAilments: "", refferedTo: "" });
      console.log("remarksCheckbox is unchecked");
    }
  }

  dispenseCheckbox(id, e) {
    if (e.target.checked) {
      this.medicineDispenses[id - 1]["allowQuantity"] = true;
      // console.log(id + " -> dispenseCheckbox is checked");
    } else {
      this.medicineDispenses[id - 1]["allowQuantity"] = false;
      // console.log(id + " -> dispenseCheckbox is unchecked");
    }
  }

  quantityInput(id, quantity) {
    // console.log("Id is -> " + id);
    // console.log("quantity is -> " + quantity.target.value);
    // console.log(quantity);
    this.medicineDispenses[id - 1]["quantity"] = +quantity.target.value;
  }

  skipper() {
    // this.medicineDispenseForm.patchValue({
    //   beneficiaryId: "",
    //   remarks: ""
    // });
    // this.dispenses = this.freshDispenses;
  }

  findAndUpsertDispense(
    patientId,
    servicePointId,
    vanId,
    itemId,
    visitId,
    quantityGiven,
    remarks,
    userId
  ) {
    this.db
      .findDispense(patientId, servicePointId, vanId, itemId, visitId)
      .then(data => {
        if (data.length > 0) {
          // Need to update the Dispense
          let updateData = {
            quantityGiven,
            remarks,
            userId,
            patientId,
            servicePointId,
            vanId,
            visitId
          };

          this.db
            .updateDispense(updateData)
            .then(data => {
              console.log(
                "Success -> updateDispense is updated Successfully..."
              );
            })
            .catch(e => {
              console.error(
                "Error -> updateDispense is not updated" + JSON.stringify(e)
              );
            });
        } else {
          // Need to insert the Dispense
          let insertData = {
            patientId,
            visitId,
            deviceId: this.deviceId,
            vanId,
            routeVillageId: this.routeVillageId,
            servicePointId,
            compoundPatientId: this.compoundPatientId,
            visitCount: this.visitCount,
            itemId,
            batchNo: -1,
            brandName: "N/A",
            expiryDate: -1,
            duration: -1,
            quantityGiven,
            quantityNeeded: -1,
            dosage: -1,
            remarks,
            userId
          };

          this.db
            .insertDispense(insertData)
            .then(data => {
              console.log(
                "Success -> insertDispense is inserted Successfully..."
              );
            })
            .catch(e => {
              console.error(
                "Error -> insertDispense is not inserted" + JSON.stringify(e)
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
    console.log("Consumable Dispense form is submitted, below are the values");
    console.log(values);

    let patientId = this.medicineDispenseForm.get("beneficiaryId").value;
    let remarks = this.medicineDispenseForm.get("remarks").value;
    remarks = remarks ? remarks.trim() : remarks;

    if (!patientId || patientId <= 0) {
      alert("Please Select Beneficiary ID");
      return false;
    }

    let selectedDispenses = this.medicineDispenses.filter(
      medicineDispense => medicineDispense.allowQuantity
    );

    if (this.showDispenses === false && selectedDispenses.length == 0) {
      alert("Please select atleast one medicine or enter Remarks");
      return false;
    }

    if (this.showDispenses === false) {
      // console.log(this.medicineDispenses);
      let getErrors = this.medicineDispenses.filter(
        medicineDispense =>
          medicineDispense.allowQuantity && !medicineDispense.quantity
      );
      console.log("Empty dispense IDs are below");
      console.log(getErrors);
      if (getErrors.length > 0) {
        alert("Please Enter quantity for checked Medicine Dispenses");
        return false;
      }
    } else {
      if (!remarks || remarks == null) {
        alert("Please Enter Remarks");
        return false;
      }
    }

    alert("Form can be submited");

    this.visitId = this.commonService.beneficiaryDetails["userVisitId"];
    this.deviceId = this.commonService.beneficiaryDetails["userDeviceId"];
    this.vanId = this.commonService.beneficiaryDetails["userVanId"];
    this.routeVillageId = this.commonService.beneficiaryDetails[
      "userRouteVillageId"
    ];
    this.servicePointId = this.commonService.beneficiaryDetails[
      "userServicePointId"
    ];
    this.compoundPatientId = this.commonService.beneficiaryDetails[
      "userCompoundPatientId"
    ];
    this.visitCount = this.commonService.beneficiaryDetails["userVisitCount"];

    this.userId = this.commonService.userDetails["userId"];

    if (this.showDispenses === false) {
      console.log("Upsert for Dispenses");
      for (let i = 0; i < selectedDispenses.length; i++) {
        let itemId = selectedDispenses[i]["itemId"];
        let quantityGiven = selectedDispenses[i]["quantity"];
        let remarks = null;
        console.log("Dispense Id --> " + itemId);
        console.log("quantityGiven is --> " + quantityGiven);

        // this.findAndUpsertDispense(
        //   patientId,
        //   this.servicePointId,
        //   this.vanId,
        //   itemId,
        //   this.visitId,
        //   quantityGiven,
        //   remarks,
        //   this.userId
        // );
      }

      // this.router.navigate(["/consumable-dispense"]);
    } else {
      console.log("Upsert for Remarks");
      console.log("remarks is --> " + remarks);

      // this.findAndUpsertDispense(
      //   patientId,
      //   this.servicePointId,
      //   this.vanId,
      //   -1,
      //   this.visitId,
      //   -1,
      //   remarks,
      //   this.userId
      // );

      // this.router.navigate(["/consumable-dispense"]);
    }
  }
}
