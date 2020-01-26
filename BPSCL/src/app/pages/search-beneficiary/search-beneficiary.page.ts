import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { CommonService } from "./../../services/common.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-search-beneficiary",
  templateUrl: "./search-beneficiary.page.html",
  styleUrls: ["./search-beneficiary.page.scss"]
})
export class SearchBeneficiaryPage implements OnInit {
  searchBenForm: FormGroup;
  beneficiaries: any[] = [];
  genders: any[] = [
    {
      genderId: 1,
      gender: "Male"
    },
    {
      genderId: 2,
      gender: "Female"
    },
    {
      genderId: 3,
      gender: "Others"
    }
  ];
  ageUnits: any[] = [
    {
      ageUnitId: 1,
      ageUnitName: "Days"
    },
    {
      ageUnitId: 2,
      ageUnitName: "Months"
    },
    {
      ageUnitId: 3,
      ageUnitName: "Years"
    }
  ];

  newDate = new Date();
  dateTime: string = this.commonService.getDateTime(this.newDate);

  servicePointName: string = this.commonService.sessionDetails[
    "servicePointName"
  ];
  servicePointId = this.commonService.sessionDetails["servicePointId"];

  constructor(
    private db: DatabaseService,
    private router: Router,
    private commonService: CommonService,
    private storageService: StorageService
  ) {
    this.searchBenForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      beneficiaryName: new FormControl("", Validators.required),
      beneficiarySurname: new FormControl("", Validators.required),
      beneficiaryAge: new FormControl("", Validators.required),
      beneficiaryAgeUnit: new FormControl("", Validators.required),
      beneficiaryGender: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    // this.loadAgeUnits();
    // this.loadGenders();
  }

  loadAgeUnits() {
    this.db
      .getAgeUnits()
      .then(ageUnits => {
        console.log("Fetched AgeUnits -> " + JSON.stringify(ageUnits));
        this.ageUnits = ageUnits.map(ageUnit => ({
          ...ageUnit,
          isSelected: false
        }));
      })
      .catch(error => {
        console.error(
          "Error -> getAgeUnits() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  loadGenders() {
    this.db
      .getGenders()
      .then(genders => {
        console.log("Fetched genders -> " + JSON.stringify(genders));
        this.genders = genders;
      })
      .catch(error => {
        console.error(
          "Error -> getGenders() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  onSubmit(values) {
    console.clear();
    console.log("Search Ben form is submitted, below are the values");
    console.log(values);

    let beneficiaryId = this.searchBenForm.get("beneficiaryId").value;
    beneficiaryId = beneficiaryId ? beneficiaryId.trim() : beneficiaryId;
    let beneficiaryName = this.searchBenForm
      .get("beneficiaryName")
      .value.trim();
    let beneficiarySurname = this.searchBenForm
      .get("beneficiarySurname")
      .value.trim();
    let beneficiaryAge = this.searchBenForm.get("beneficiaryAge").value;
    let beneficiaryAgeUnit = this.searchBenForm.get("beneficiaryAgeUnit").value;
    let beneficiaryGender = this.searchBenForm.get("beneficiaryGender").value;

    if (
      !beneficiaryId &&
      !beneficiaryName &&
      !beneficiarySurname &&
      !beneficiaryAge &&
      !beneficiaryAgeUnit &&
      !beneficiaryGender
    ) {
      alert("Please fill any one the fields.");
      return false;
    }

    this.beneficiaries = [
      {
        imageUrl: "assets/profile_pic.jpg",
        patientId: "SP0002000002B00TEST",
        name: "test",
        surname: "jumbo",
        gender: "Female",
        age: 25
      }
    ];

    // alert("Form can be submitted");

    let query = `SELECT Distinct vi.patientId, bi.name, bi.surname, mg.gender, vi.age, ma.ageUnitName, bi.imageUrl FROM dp_Visit vi INNER JOIN dp_Registration bi  ON vi.patientId = bi.patientId INNER JOIN mp_ageunit ma ON ma.ageUnitId = vi.ageTypeId INNER JOIN mp_Gender mg ON bi.genderId = mg.genderId WHERE bi.servicePointId = ${this.servicePointId} AND visitCount=1`;

    if (beneficiaryId && beneficiaryId != null) {
      query += ` AND vi.patientId LIKE '%${beneficiaryId}%'`;
    }
    if (beneficiaryName && beneficiaryName != null) {
      query += ` AND bi.name LIKE '%${beneficiaryName}%'`;
    }
    if (beneficiarySurname && beneficiarySurname != null) {
      query += ` AND bi.surname LIKE '%${beneficiarySurname}%'`;
    }
    if (beneficiaryAge && beneficiaryAge != null) {
      query += ` AND vi.age = ${beneficiaryAge}`;
    }
    if (beneficiaryAgeUnit && beneficiaryAgeUnit != null) {
      query += ` AND vi.ageTypeId = ${beneficiaryAgeUnit}`;
    }
    if (beneficiaryGender && beneficiaryGender != null) {
      query += ` AND bi.genderId = ${beneficiaryGender}`;
    }

    console.log("Final Query is  --> " + query);

    this.db
      .searchBeneficiaries(query)
      .then(beneficiaries => {
        console.log(
          "Fetched beneficiariesData -> " + JSON.stringify(beneficiaries)
        );
        if (beneficiaries.length > 0) {
          this.beneficiaries = beneficiaries;
          if (
            !this.beneficiaries["imageUrl"] ||
            this.beneficiaries["imageUrl"] == null
          ) {
            this.beneficiaries["imageUrl"] = "assets/profile_pic.jpg";
          }
        }
      })
      .catch(error => {
        console.error(
          "Error -> searchBeneficiaries() function returned error." +
            JSON.stringify(error)
        );
      });
  }
}
