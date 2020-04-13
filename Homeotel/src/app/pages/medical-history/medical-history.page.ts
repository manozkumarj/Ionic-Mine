import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-medical-history",
  templateUrl: "./medical-history.page.html",
  styleUrls: ["./medical-history.page.scss"],
})
export class MedicalHistoryPage {
  medicalHistories: any[] = [];

  allergyData: any[] = [];
  currentMedicationData: any[] = [];
  postMedicationData: any[] = [];
  surgeryData: any[] = [];
  injuryData: any[] = [];
  chronicData: any[] = [];
  familyHistoryData: any[] = [];

  m_allergies: any[] = [];
  medications: any[] = [];
  m_currentMedication: any[] = [];
  m_postMedication: any[] = [];
  m_surgeries: any[] = [];
  m_injuries: any[] = [];
  m_chronicDieseases: any[] = [];
  m_familyHistory: any[] = [];

  allergies = "Select";
  selectedAllergyIds: any[] = [];

  currentMedications = "Select";
  selectedCurrentMedicationIds: any[] = [];

  postMedications = "Select";
  selectedPostMedicationIds: any[] = [];

  surgeries = "Select";
  selectedSurgeryIds: any[] = [];

  injuries = "Select";
  selectedInjuryIds: any[] = [];

  chronics = "Select";
  selectedChronicIds: any[] = [];

  familyHistories = "Select";
  selectedFamilyHistoryIds: any[] = [];

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.getMedicalHistories();
  }

  // ionViewWillEnter() {
  // this.getMedicalHistories();
  // this.setMedicalHistories();
  // }

  setMedicalHistories() {
    this.medicalHistories = [
      {
        id: 0,
        name: "Allergies",
        tag: "allergies",
        list: this.allergies,
        dataTag: "allergyData",
        masterDataTag: "m_allergies",
        data: this.allergyData,
        size: this.allergyData.length > 0 ? 6 : "auto",
        redirectTo: "/multi-selection",
      },
      {
        id: 1,
        name: "Current Medication",
        tag: "currentMedication",
        list: this.currentMedications,
        dataTag: "currentMedicationData",
        masterDataTag: "m_currentMedication",
        data: this.currentMedicationData,
        size: this.currentMedicationData.length > 0 ? 6 : "auto",
        redirectTo: "/multi-selection",
      },
      {
        id: 2,
        name: "Post Medication",
        tag: "postMedication",
        list: this.postMedications,
        dataTag: "postMedicationData",
        masterDataTag: "m_postMedication",
        data: this.postMedicationData,
        size: this.postMedicationData.length > 0 ? 6 : "auto",
        redirectTo: "/multi-selection",
      },
      {
        id: 3,
        name: "Surgeries",
        tag: "surgeries",
        list: this.surgeries,
        dataTag: "surgeryData",
        masterDataTag: "m_surgeries",
        data: this.surgeryData,
        size: this.surgeryData.length > 0 ? 6 : "auto",
        redirectTo: "/multi-selection",
      },
      {
        id: 4,
        name: "Injuries",
        tag: "injuries",
        list: this.injuries,
        dataTag: "injuryData",
        masterDataTag: "m_injuries",
        data: this.injuryData,
        size: this.injuryData.length > 0 ? 6 : "auto",
        redirectTo: "/multi-selection",
      },
      {
        id: 5,
        name: "Chronic Diseases",
        tag: "chronics",
        list: this.chronics,
        dataTag: "chronicData",
        masterDataTag: "m_chronicDieseases",
        data: this.chronicData,
        size: this.chronicData.length > 0 ? 6 : "auto",
        redirectTo: "/multi-selection",
      },
      {
        id: 6,
        name: "Family History",
        tag: "familyHistory",
        list: this.familyHistories,
        size: this.familyHistoryData.length > 0 ? 6 : "auto",
        redirectTo: "/multi-selection",
      },
    ];

    console.log("this.medicalHistories is below");
    console.log(this.medicalHistories);
  }

  getMedicalHistories() {
    this.apiService.getMedicalHistories().subscribe((data) => {
      console.log("Returned from Backend");
      console.log(data);
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (
          typeof data != "undefined" &&
          typeof data[0] != "undefined" &&
          typeof data[0][0] != "undefined"
        ) {
          console.log("Data returned from backend");
          this.m_allergies = data[0];
          this.m_allergies = this.m_allergies.map((obj) => {
            return { ...obj, self_id: obj["allergy_id"] };
          });

          this.m_currentMedication = data[1];
          this.m_currentMedication = this.m_currentMedication.map((obj) => {
            return { ...obj, self_id: obj["current_medication_id"] };
          });

          this.m_postMedication = data[2];
          this.m_postMedication = this.m_postMedication.map((obj) => {
            return { ...obj, self_id: obj["post_medication_id"] };
          });

          this.m_surgeries = data[3];
          this.m_surgeries = this.m_surgeries.map((obj) => {
            return { ...obj, self_id: obj["surgery_id"] };
          });

          this.m_injuries = data[4];
          this.m_injuries = this.m_injuries.map((obj) => {
            return { ...obj, self_id: obj["injury_id"] };
          });

          this.m_chronicDieseases = data[5];
          this.m_chronicDieseases = this.m_chronicDieseases.map((obj) => {
            return { ...obj, self_id: obj["disease_id"] };
          });

          this.m_familyHistory = data[6];

          this.allergyData = data[7];
          this.allergyData = this.allergyData.map((obj) => {
            return { ...obj, self_id: obj["allergy_id"] };
          });
          console.log("this.allergyData is below");
          console.log(this.allergyData);

          this.currentMedicationData = data[8];
          this.currentMedicationData = this.currentMedicationData.map((obj) => {
            return { ...obj, self_id: obj["medication_id"] };
          });

          this.postMedicationData = data[9];
          this.postMedicationData = this.postMedicationData.map((obj) => {
            return { ...obj, self_id: obj["medication_id"] };
          });

          this.surgeryData = data[10];
          this.surgeryData = this.surgeryData.map((obj) => {
            return { ...obj, self_id: obj["surgery_id"] };
          });

          this.injuryData = data[11];
          this.injuryData = this.injuryData.map((obj) => {
            return { ...obj, self_id: obj["injury_id"] };
          });

          this.chronicData = data[12];
          this.chronicData = this.chronicData.map((obj) => {
            return { ...obj, self_id: obj["disease_id"] };
          });

          this.familyHistoryData = data[13];

          if (this.allergyData.length > 0) {
            this.allergies = "Comma separation";
            let names = this.allergyData.map((item) => {
              return item["name"];
            });
            console.log("allergies names below -> ");
            console.log(names);
            this.allergies = names.join(", ");
          }

          if (this.currentMedicationData.length > 0) {
            this.currentMedications = "Comma separation";
            let names = this.currentMedicationData.map((item) => {
              return item["name"];
            });
            // console.log("names -> ");
            // console.log(names);
            this.currentMedications = names.join(", ");
          }

          if (this.postMedicationData.length > 0) {
            this.postMedications = "Comma separation";
            let medicationNames = this.postMedicationData.map((item) => {
              return item["name"];
            });
            // console.log("medicationNames -> ");
            // console.log(medicationNames);
            this.postMedications = medicationNames.join(", ");
          }

          if (this.surgeryData.length > 0) {
            this.surgeries = "Comma separation";
            let names = this.surgeryData.map((item) => {
              return item["name"];
            });
            // console.log("names -> ");
            // console.log(names);
            this.surgeries = names.join(", ");
          }

          if (this.injuryData.length > 0) {
            this.injuries = "Comma separation";
            let names = this.injuryData.map((item) => {
              return item["name"];
            });
            // console.log("names -> ");
            // console.log(names);
            this.injuries = names.join(", ");
          }

          if (this.chronicData.length > 0) {
            this.chronics = "Comma separation";
            let names = this.chronicData.map((item) => {
              return item["name"];
            });
            // console.log("names -> ");
            // console.log(names);
            this.chronics = names.join(", ");
          }

          if (this.familyHistoryData.length > 0) {
            this.familyHistories = "Comma separation";
          }

          this.utilities.medicalHistoryPageState[
            "m_allergies"
          ] = this.m_allergies;

          this.utilities.medicalHistoryPageState[
            "m_currentMedication"
          ] = this.m_currentMedication;

          this.utilities.medicalHistoryPageState[
            "m_postMedication"
          ] = this.m_postMedication;

          this.utilities.medicalHistoryPageState[
            "m_surgeries"
          ] = this.m_surgeries;
          this.utilities.medicalHistoryPageState[
            "m_injuries"
          ] = this.m_injuries;
          this.utilities.medicalHistoryPageState[
            "m_chronicDieseases"
          ] = this.m_chronicDieseases;
          this.utilities.medicalHistoryPageState[
            "m_familyHistory"
          ] = this.m_familyHistory;

          console.log(
            "this.utilities.medicalHistoryPageState is showing below"
          );
          console.log(this.utilities.medicalHistoryPageState);

          this.setMedicalHistories();
        } else {
          console.log("Something went wrong in backend");
        }
      }
    });
  }

  redirect(id) {
    console.log("Selected ID -> " + id);
    console.log(this.medicalHistories[id]);
    this.utilities.medicalHistoryPageState[
      "selectedMedicalHistory"
    ] = this.medicalHistories[id];
    this.router.navigate([this.medicalHistories[id]["redirectTo"]]);
  }
}
