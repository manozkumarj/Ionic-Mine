import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-consumable-dispense",
  templateUrl: "./consumable-dispense.page.html",
  styleUrls: ["./consumable-dispense.page.scss"]
})
export class ConsumableDispensePage implements OnInit {
  consumableDispenseForm: FormGroup;

  showDispenses: boolean = false;
  benIds: any[] = [];
  dispenses: any[] = [];

  consumableDispenses: any[] = [
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

  constructor(
    private db: DatabaseService,
    private commonService: CommonService,
    private router: Router,
    private storageService: StorageService
  ) {
    // this.loadBeneficiaries();
    // loadDispenses();

    this.consumableDispenseForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      remarks: new FormControl("", Validators.required)
    });
  }

  ngOnInit() { }

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
      .getDispenses(2)
      .then(dispenses => {
        console.log("Fetched Dispenses -> " + JSON.stringify(dispenses));
        this.dispenses = dispenses;
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
      this.showDispenses = true;
      this.consumableDispenseForm.patchValue({ remarks: '' });
    } else {
      this.showDispenses = false;
      // this.doctorForm.patchValue({ cd: "", ncd: "", minorAilments: "", refferedTo: "" });
      // console.log("remarksCheckbox is unchecked");
    }
  }

  dispenseCheckbox(id, e) {
    if (e.target.checked) {
      this.consumableDispenses[id - 1]["allowQuantity"] = true;
      // console.log(id + " -> dispenseCheckbox is checked");
    } else {
      this.consumableDispenses[id - 1]["allowQuantity"] = false;
      // console.log(id + " -> dispenseCheckbox is unchecked");
    }
  }

  quantityInput(id, quantity) {
    // console.log("Id is -> " + id);
    // console.log("quantity is -> " + quantity.target.value);
    // console.log(quantity);
    this.consumableDispenses[id - 1]["quantity"] = +quantity.target.value;
  }


  findAndUpsertDispense(patientId, servicePointId, vanId, itemId, visitId, quantityGiven, remarks, userId) {

    this.db.findDispense(patientId, servicePointId, vanId, itemId, visitId).then(data => {

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
        }

        this.db.updateDispense(updateData).then(data => {
          console.log("Success -> updateDispense is updated Successfully...");
        }).catch(e => {
          console.error("Error -> updateDispense is not updated" + JSON.stringify(e));
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
          brandName: 'N/A',
          expiryDate: -1,
          duration: -1,
          quantityGiven,
          quantityNeeded: -1,
          dosage: -1,
          remarks,
          userId
        }

        this.db.insertDispense(insertData).then(data => {
          console.log("Success -> insertDispense is inserted Successfully...");
        }).catch(e => {
          console.error("Error -> insertDispense is not inserted" + JSON.stringify(e));
        });

      }

    }).catch(e => {
      console.error("Error -> findDispense returned error" + JSON.stringify(e));
    });

  }

  onSubmit(values) {
    console.clear()
    console.log("Consumable Dispense form is submitted, below are the values");
    console.log(values);

    let patientId = this.consumableDispenseForm.get("beneficiaryId").value;
    let remarks = this.consumableDispenseForm.get("remarks").value.trim();

    if (!patientId || patientId <= 0) {
      alert("Please Select Beneficiary ID");
      return false;
    }

    let selectedDispenses = this.consumableDispenses.filter(
      medicineDispense => medicineDispense.allowQuantity
    );

    if (this.showDispenses === false && selectedDispenses.length == 0) {
      alert("Please select atleast one medicine or enter Remarks");
      return false;
    }

    if (this.showDispenses === false) {
      // console.log(this.consumableDispenses);
      let getErrors = this.consumableDispenses.filter(
        consumableDispense =>
          consumableDispense.allowQuantity && !consumableDispense.quantity
      );
      console.log("Empty dispense IDs are below");
      console.log(getErrors);
      if (getErrors.length > 0) {
        alert("Please Enter quantity for checked Consumable Dispenses");
        return false;
      }
    } else {
      if (!remarks || remarks == null) {
        alert("Please Enter Remarks");
        return false;
      }
    }

    alert("Form can be submited");

    this.visitId = this.commonService.beneficiaryDetails['userVisitId'];
    this.deviceId = this.commonService.beneficiaryDetails['userDeviceId'];
    this.vanId = this.commonService.beneficiaryDetails['userVanId'];
    this.routeVillageId = this.commonService.beneficiaryDetails['userRouteVillageId'];
    this.servicePointId = this.commonService.beneficiaryDetails['userServicePointId'];
    this.compoundPatientId = this.commonService.beneficiaryDetails['userCompoundPatientId'];
    this.visitCount = this.commonService.beneficiaryDetails['userVisitCount'];

    this.userId = this.commonService.userDetails['userId'];

    if (this.showDispenses === false) {
      console.log("Upsert for Dispenses");
      for (let i = 0; i < selectedDispenses.length; i++) {
        let itemId = selectedDispenses[i]['itemId'];
        let quantityGiven = selectedDispenses[i]['quantity'];
        let remarks = null;
        console.log("Dispense Id --> " + itemId);
        this.findAndUpsertDispense(patientId, this.servicePointId, this.vanId, itemId, this.visitId, quantityGiven, remarks, this.userId);
      }

      this.router.navigate(["/beneficiary-history"]);

    } else {
      console.log("Upsert for Remarks");
      this.findAndUpsertDispense(patientId, this.servicePointId, this.vanId, -1, this.visitId, -1, remarks, this.userId);

      this.router.navigate(["/beneficiary-history"]);
    }

  }
}
