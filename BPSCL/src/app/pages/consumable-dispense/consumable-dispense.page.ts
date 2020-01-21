import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
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

  constructor(
    private db: DatabaseService,
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
      // this.doctorForm.patchValue({ cd: "N/A", ncd: "N/A", minorAilments: "N/A", refferedTo: -1 });
      // console.log("remarksCheckbox is checked");
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

  onSubmit(values) {
    // console.log("Consumable Dispense form is submitted, below are the values");
    // console.log(values);

    let beneficiaryId = this.consumableDispenseForm.get("beneficiaryId").value;
    let remarks = this.consumableDispenseForm.get("remarks").value.trim();

    if (!beneficiaryId || beneficiaryId <= 0) {
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
      console.log("Error are below");
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
  }
}
