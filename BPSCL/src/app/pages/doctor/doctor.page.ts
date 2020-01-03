import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  doctorForm: FormGroup;

  showRemarks: boolean = false;
  benIds: any[] = [];

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService) {
    this.loadBeneficiaries();

    this.doctorForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      rch: new FormControl("", Validators.required),
      cd: new FormControl("", Validators.required),
      ncd: new FormControl("", Validators.required),
      minorAilments: new FormControl("", Validators.required),
      remarks: new FormControl("", Validators.required),
      refferedTo: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  loadBeneficiaries() {

  }

  remarksCheckbox(e) {
    if (e.target.checked) {
      this.showRemarks = true;
      this.doctorForm.patchValue({ cd: "N/A", ncd: "N/A", minorAilments: "N/A", refferedTo: -1 });
      console.log("remarksCheckbox is checked");
    } else {
      this.showRemarks = false;
      this.doctorForm.patchValue({ cd: "", ncd: "", minorAilments: "", refferedTo: "" });
      console.log("remarksCheckbox is unchecked");
    }
  }

  resetValues() {
    this.doctorForm.patchValue({
      beneficiaryId: '',
      rch: '',
      cd: '',
      ncd: '',
      minorAilments: '',
      remarks: '',
      refferedTo: ''
    });
  }


  onSubmit(values) {
    console.log("Doctor form is submitted, below are the values");
    console.log(values);

    let beneficiaryId = this.doctorForm.get("beneficiaryId").value;
    let rch = this.doctorForm.get("rch").value.trim();
    let cd = this.doctorForm.get("cd").value.trim();
    let ncd = this.doctorForm.get("ncd").value.trim();
    let minorAilments = this.doctorForm.get("minorAilments").value.trim();
    let remarks = this.doctorForm.get("remarks").value.trim();
    let refferedTo = this.doctorForm.get("refferedTo").value;

    if (!beneficiaryId || beneficiaryId <= 0) {
      alert("Please Select Beneficiary ID");
      return false;
    }
    if (!rch || rch == null) {
      alert("Please Select RCH");
      return false;
    }

    if (this.showRemarks === false) {
      if (!cd || cd == null) {
        alert("Please Enter CD");
        return false;
      }
      if (!ncd || ncd == null) {
        alert("Please Enter NCD");
        return false;
      }
      if (!minorAilments || minorAilments == null) {
        alert("Please Enter Minor Ailments");
        return false;
      }
      if (!refferedTo || refferedTo == null) {
        alert("Please Select Reffered To");
        return false;
      }
    } else {
      if (!remarks || remarks == null) {
        alert("Please Enter Remarks");
        return false;
      }
    }

  }

}
