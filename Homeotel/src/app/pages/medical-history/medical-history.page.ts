import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-medical-history",
  templateUrl: "./medical-history.page.html",
  styleUrls: ["./medical-history.page.scss"],
})
export class MedicalHistoryPage implements OnInit {
  medicalHistories;

  m_allergies: any[] = [];
  medications: any[] = [];
  m_currentMedication: any[] = [];
  m_postMedication: any[] = [];
  m_surgeries: any[] = [];
  m_injuries: any[] = [];
  m_chronicDieseases: any[] = [];
  m_familyHistory: any[] = [];

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService
  ) {
    this.getMedicalHistories();
  }

  ngOnInit() {
    this.medicalHistories = [
      {
        id: 1,
        name: "Allergies",
        list: "Sea food, Eggs",
        redirectTo: "/allergies",
      },
      {
        id: 2,
        name: "Current Medication",
        list: "Paracetamol",
        redirectTo: "/allergies",
      },
      {
        id: 3,
        name: "Post Medication",
        list: "Metmorfin",
        redirectTo: "/allergies",
      },
      {
        id: 4,
        name: "Surgeries",
        list: "No",
        redirectTo: "/allergies",
      },
      {
        id: 5,
        name: "Injuries",
        list: "Select",
        redirectTo: "/allergies",
      },
      {
        id: 6,
        name: "Chronic Diseases",
        list: "Select",
        redirectTo: "/allergies",
      },
      {
        id: 7,
        name: "Family History",
        list: "Father - Diabetes, Grand Father - Hypertension",
        redirectTo: "/allergies",
      },
    ];
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
        } else {
          console.log("Something went wrong in backend");
        }
      }
    });
  }
}
