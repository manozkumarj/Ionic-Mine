import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-medicine-dispense',
  templateUrl: './medicine-dispense.page.html',
  styleUrls: ['./medicine-dispense.page.scss'],
})
export class MedicineDispensePage implements OnInit {
  medicineDispenseForm: FormGroup;

  showDispenses: boolean = false;

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

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService) {
    this.loadBeneficiaries();

    this.medicineDispenseForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      remarks: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  loadBeneficiaries() {

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


  onSubmit(values) {
    // console.log("Consumable Dispense form is submitted, below are the values");
    // console.log(values);

    let beneficiaryId = this.medicineDispenseForm.get("beneficiaryId").value;
    let remarks = this.medicineDispenseForm.get("remarks").value.trim();

    if (!beneficiaryId || beneficiaryId <= 0) {
      alert("Please Select Beneficiary ID");
      return false;
    }

    if (this.showDispenses === false) {
      // console.log(this.medicineDispenses);
      let getErrors = this.medicineDispenses.filter(medicineDispense =>
        medicineDispense.allowQuantity && !medicineDispense.quantity);
      console.log("Error are below");
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

  }
}
