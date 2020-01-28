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

  itemTypeId = 1;

  showDispenses: boolean = false;
  benIds: any[] = [];
  freshDispenses: any[] = [];
  medicineDispenses: any[] = [];

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
    this.loadDispenses();
    this.loadUserDetails();
    this.loadSessionDetails();
    this.loadBeneficiaries();

    this.medicineDispenseForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      remarks: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

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
      .getDispenses(this.itemTypeId)
      .then(dispenses => {
        console.log("Fetched Dispenses -> " + JSON.stringify(dispenses));

        this.freshDispenses = dispenses.map(dispense => ({
          ...dispense,
          allowQuantity: false,
          quantity: null
        }));
        this.medicineDispenses = this.freshDispenses;
        console.log("********-----------************");
        console.log("freshDispenses -> " + JSON.stringify(this.freshDispenses));
      })
      .catch(error => {
        console.error(
          "Error -> getDispenses() function returned error." +
            JSON.stringify(error)
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

  benIdChange() {
    let selectedBenID = this.medicineDispenseForm.get("beneficiaryId").value;
    console.log("selectedBenID is -> " + selectedBenID);
    if (selectedBenID && selectedBenID != null)
      this.getBenDetails(selectedBenID);
  }

  getBenDetails(selectedBenID) {
    this.db
      .getBeneficiaryDetails(selectedBenID)
      .then(benDetails => {
        console.log(
          "Received Ben details are -> " + JSON.stringify(benDetails)
        );
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
        if (data > 0) {
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
            itemTypeId: this.itemTypeId,
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
                "Success -> insertDispense is inserted Successfully..." + data
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

    console.log("Form can be submited");

    let userId = this.userId;
    let vanId = this.vanId;
    let servicePointId = this.servicePointId;

    this.visitId = this.commonService.beneficiaryDetails["userVisitId"];
    this.routeVillageId = this.commonService.beneficiaryDetails[
      "userRouteVillageId"
    ];
    this.compoundPatientId = this.commonService.beneficiaryDetails[
      "userCompoundPatientId"
    ];
    this.visitCount = this.commonService.beneficiaryDetails["userVisitCount"];

    if (this.showDispenses === false) {
      console.log("Upsert for Dispenses");
      for (let i = 0; i < selectedDispenses.length; i++) {
        let itemId = selectedDispenses[i]["itemId"];
        let quantityGiven = selectedDispenses[i]["quantity"];
        let remarks = null;
        console.log("Dispense Id --> " + itemId);
        console.log("quantityGiven is --> " + quantityGiven);

        console.log(
          patientId +
            " *** " +
            servicePointId +
            " *** " +
            vanId +
            " *** " +
            itemId +
            " *** " +
            this.visitId +
            " *** " +
            quantityGiven +
            " *** " +
            remarks +
            " *** " +
            userId
        );

        this.findAndUpsertDispense(
          patientId,
          servicePointId,
          vanId,
          itemId,
          this.visitId,
          quantityGiven,
          remarks,
          userId
        );
      }

      this.router.navigate(["/consumable-dispense"]);
    } else {
      console.log("Upsert for Remarks");
      console.log("remarks is --> " + remarks);

      this.findAndUpsertDispense(
        patientId,
        servicePointId,
        vanId,
        -1,
        this.visitId,
        -1,
        remarks,
        userId
      );

      this.router.navigate(["/consumable-dispense"]);
    }
  }
}
