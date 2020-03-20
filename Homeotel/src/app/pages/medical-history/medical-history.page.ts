import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-medical-history",
  templateUrl: "./medical-history.page.html",
  styleUrls: ["./medical-history.page.scss"]
})
export class MedicalHistoryPage implements OnInit {
  medicalHistories;

  constructor() {}

  ngOnInit() {
    this.medicalHistories = [
      {
        id: 1,
        name: "Allergies",
        list: "Sea food, Eggs"
      },
      {
        id: 2,
        name: "Current Medication",
        list: "Paracetamol"
      },
      {
        id: 3,
        name: "Post Medication",
        list: "Metmorfin"
      },
      {
        id: 4,
        name: "Surgeries",
        list: "No"
      },
      {
        id: 5,
        name: "Injuries",
        list: "Select"
      },
      {
        id: 6,
        name: "Chronic Diseases",
        list: "Select"
      },
      {
        id: 7,
        name: "Family History",
        list: "Father - Diabetes, Grand Father - Hypertension"
      }
    ];
  }
}
