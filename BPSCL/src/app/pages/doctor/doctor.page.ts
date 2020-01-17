import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-doctor",
  templateUrl: "./doctor.page.html",
  styleUrls: ["./doctor.page.scss"]
})
export class DoctorPage implements OnInit {
  doctorForm: FormGroup;

  showRemarks: boolean = false;
  benIds: any[] = [];
  hospitals: any[] = [];
  rchs: any[] = [];
  cds: any[] = [];
  ncds: any[] = [];
  minorAilments: any[] = [];

  allowOtherCd: boolean = false;
  allowOtherNcd: boolean = false;
  allowOtherMinorAilment: boolean = false;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService
  ) {
    // this.loadBeneficiaries();
    // this.loadHospitals();
    // this.loadRCHs();
    // this.loadProvisionalDiagnosis(1);
    // this.loadProvisionalDiagnosis(2);
    // this.loadProvisionalDiagnosis(3);

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
      refferedTo: new FormControl("", Validators.required)
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

  loadHospitals() {
    this.db
      .getHospitals()
      .then(hospitals => {
        console.log(
          "Fetched hospitals -> " + JSON.stringify(hospitals)
        );
        this.hospitals = hospitals;
      })
      .catch(error => {
        console.error(
          "Error -> getHospitals() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadProvisionalDiagnosis(category) {
    let categoryName;
    if (category == 1) {
      categoryName = 'CDs';
    } else if (category == 2) {
      categoryName = 'NCDs';
    } else {
      categoryName = 'Minor Ailments';
    }

    this.db
      .getProvisionalDiagnosis(category)
      .then(results => {
        console.log(
          `Fetched ${categoryName} ->  + JSON.stringify(results)`
        );
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
        console.log(
          "Fetched RCHs -> " + JSON.stringify(rchs)
        );
        this.rchs = rchs;
      })
      .catch(error => {
        console.error(
          "Error -> getRCHs() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  remarksCheckbox(e) {
    if (e.target.checked) {
      this.showRemarks = true;
      this.doctorForm.patchValue({
        cd: "N/A",
        otherCd: "",
        ncd: "N/A",
        otherNcd: "",
        minorAilments: "N/A",
        otherMinorAilment: "",
        refferedTo: -1
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
        otherMinorAilment: "",
        refferedTo: ""
      });
      console.log("remarksCheckbox is unchecked");
    }
  }

  resetValues() {
    this.doctorForm.patchValue({
      beneficiaryId: "",
      rch: "",
      cd: "",
      otherCd: "",
      ncd: "",
      otherNcd: "",
      minorAilments: "",
      otherMinorAilment: "",
      remarks: "",
      refferedTo: ""
    });
    this.allowOtherCd = false;
    this.allowOtherNcd = false;
    this.allowOtherMinorAilment = false;
  }

  cdChange() {
    let selectedCD = this.doctorForm.get("cd").value;
    console.log("selected CD are -> " + JSON.stringify(selectedCD));
    let hasOther = selectedCD.filter(id => id == 'other');

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
    let hasOther = selectedNCD.filter(id => id == 'other');

    if (hasOther.length > 0) {
      this.allowOtherNcd = true;
      console.log("Other option is selected");
    } else {
      this.allowOtherNcd = false;
    }
  }

  minorAilmentChange() {
    let selectedMinorAilment = this.doctorForm.get("minorAilments").value;
    console.log("selected minorAilment are -> " + JSON.stringify(selectedMinorAilment));
    let hasOther = selectedMinorAilment.filter(id => id == 'other');

    if (hasOther.length > 0) {
      this.allowOtherMinorAilment = true;
      console.log("Other option is selected");
    } else {
      this.allowOtherMinorAilment = false;
    }
  }

  onSubmit(values) {
    console.clear();
    console.log("Doctor form is submitted, below are the values");
    console.log(values);

    let beneficiaryId = this.doctorForm.get("beneficiaryId").value;
    let rch = this.doctorForm.get("rch").value;
    let cd = this.doctorForm.get("cd").value;
    let otherCd = this.doctorForm.get("otherCd").value.trim();
    let ncd = this.doctorForm.get("ncd").value;
    let otherNcd = this.doctorForm.get("otherNcd").value.trim();
    let minorAilments = this.doctorForm.get("minorAilments").value;
    let otherMinorAilment = this.doctorForm.get("otherMinorAilment").value.trim();
    let remarks = this.doctorForm.get("remarks").value.trim();
    let refferedTo = this.doctorForm.get("refferedTo").value;

    if (!beneficiaryId || beneficiaryId <= 0) {
      alert("Please Select Beneficiary ID");
      return false;
    }

    if (!rch || rch.length == 0) {
      alert("Please Select RCH");
      return false;
    }

    if (this.showRemarks === false) {
      if (!cd || cd.length == 0) {
        alert("Please Select CD");
        return false;
      }
      if (this.allowOtherCd && otherCd == '') {
        alert("Please Enter CD other details.");
        return false;
      }
      if (!ncd || ncd.length == 0) {
        alert("Please Select NCD");
        return false;
      }
      if (this.allowOtherNcd && otherNcd == '') {
        alert("Please Enter NCD other details.");
        return false;
      }
      if (!minorAilments || minorAilments.length == 0) {
        alert("Please Select Minor Ailments");
        return false;
      }
      if (this.allowOtherNcd && otherMinorAilment == '') {
        alert("Please Enter Minor Ailment other details.");
        return false;
      }
      if (!refferedTo || refferedTo.length == 0) {
        alert("Please Select Reffered To");
        return false;
      }
    } else {
      if (!remarks || remarks == null) {
        alert("Please Enter Remarks");
        return false;
      }
    }

    alert("Form can be submitted");
  }
}
