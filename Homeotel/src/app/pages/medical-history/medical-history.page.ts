import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-medical-history",
  templateUrl: "./medical-history.page.html",
  styleUrls: ["./medical-history.page.scss"],
})
export class MedicalHistoryPage implements OnInit {
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
  currentMedications = "Select";
  postMedications = "Select";
  surgeries = "Select";
  injuries = "Select";
  chronics = "Select";
  familyHistories = "Select";

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService
  ) {
    this.getMedicalHistories();
  }

  ngOnInit() {
    this.setMedicalHistories();
  }

  setMedicalHistories() {
    this.medicalHistories = [
      {
        id: 1,
        name: "Allergies",
        list: this.allergies,
        size: this.allergyData.length > 0 ? 6 : "auto",
        redirectTo: "/allergies",
      },
      {
        id: 2,
        name: "Current Medication",
        list: this.currentMedications,
        size: this.currentMedicationData.length > 0 ? 6 : "auto",
        redirectTo: "/allergies",
      },
      {
        id: 3,
        name: "Post Medication",
        list: this.postMedications,
        size: this.postMedicationData.length > 0 ? 6 : "auto",
        redirectTo: "/allergies",
      },
      {
        id: 4,
        name: "Surgeries",
        list: this.surgeries,
        size: this.surgeryData.length > 0 ? 6 : "auto",
        redirectTo: "/allergies",
      },
      {
        id: 5,
        name: "Injuries",
        list: this.injuries,
        size: this.injuryData.length > 0 ? 6 : "auto",
        redirectTo: "/allergies",
      },
      {
        id: 6,
        name: "Chronic Diseases",
        list: this.chronics,
        size: this.chronicData.length > 0 ? 6 : "auto",
        redirectTo: "/allergies",
      },
      {
        id: 7,
        name: "Family History",
        list: this.familyHistories,
        size: this.familyHistoryData.length > 0 ? 6 : "auto",
        redirectTo: "/allergies",
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
          this.medications = data[1];
          this.m_surgeries = data[2];
          this.m_injuries = data[3];
          this.m_chronicDieseases = data[4];
          this.m_familyHistory = data[5];

          this.allergyData = data[6];
          this.currentMedicationData = data[7];
          this.postMedicationData = data[8];
          this.surgeryData = data[9];
          this.injuryData = data[10];
          this.chronicData = data[11];
          this.familyHistoryData = data[12];

          if (this.allergyData.length > 0) {
            this.allergies = "Comma separation";
            let names = this.allergyData.map((item) => {
              return item["name"];
            });
            // console.log("names -> ");
            // console.log(names);
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
          ] = this.medications.filter(
            (medication) => medication["medication_type_id"] == 1
          );
          this.utilities.medicalHistoryPageState[
            "m_postMedication"
          ] = this.medications.filter(
            (medication) => medication["medication_type_id"] == 2
          );

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
}
