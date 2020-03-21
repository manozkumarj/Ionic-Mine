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
        list: "Sea food, Eggs",
        redirectTo: "/allergies"
      },
      {
        id: 2,
        name: "Current Medication",
        list: "Paracetamol",
        redirectTo: "/allergies"
      },
      {
        id: 3,
        name: "Post Medication",
        list: "Metmorfin",
        redirectTo: "/allergies"
      },
      {
        id: 4,
        name: "Surgeries",
        list: "No",
        redirectTo: "/allergies"
      },
      {
        id: 5,
        name: "Injuries",
        list: "Select",
        redirectTo: "/allergies"
      },
      {
        id: 6,
        name: "Chronic Diseases",
        list: "Select",
        redirectTo: "/allergies"
      },
      {
        id: 7,
        name: "Family History",
        list: "Father - Diabetes, Grand Father - Hypertension",
        redirectTo: "/allergies"
      }
    ];
  }
}
