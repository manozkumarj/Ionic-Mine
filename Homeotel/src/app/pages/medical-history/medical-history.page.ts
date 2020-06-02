import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

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
    private db: DatabaseService,
    private loadingController: LoadingController,
    private router: Router
  ) {
    // this.getMedicalHistories();
  }

  ionViewWillEnter() {
    this.setMedicalHistories();
    this.loadMedicalHistoryMasters();
  }

  async loadMedicalHistoryMasters() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getMedicalHistoryMasters()
            .then((res: any[]) => {
              console.log(
                "Received getMedicalHistoryMasters details are below -> "
              );
              console.log(res);
              let lifestyleMasters = res;
              lifestyleMasters.forEach((data) => {
                if (data["master_type"] == "table_allergy") {
                  this.m_allergies.push({
                    allergy_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_current_medication") {
                  this.m_currentMedication.push({
                    current_medication_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_post_medication") {
                  this.m_postMedication.push({
                    post_medication_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_surgery") {
                  this.m_surgeries.push({
                    surgery_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_injury") {
                  this.m_injuries.push({
                    injury_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_disease") {
                  this.m_chronicDieseases.push({
                    disease_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_relation") {
                  this.m_familyHistory.push({
                    relation_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                }
              });

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

              this.loadgetAllergiesData();
              this.loadgetCurrentMedicationsData();
              this.loadgetPostMedicationsData();
              this.loadgetSurgeriesData();
              this.loadgetInjuriesData();
              this.loadgetDiseasesData();
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "medical-history * loadgetMedicalHistoryMasters",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadgetMedicalHistoryMasters() function returned error." +
                  JSON.stringify(error)
              );
              // this.loadMedicalHistoryData();
            });
          a.dismiss();
        });
      });
  }

  loadgetAllergiesData() {
    this.db
      .getAllergiesData(
        this.utilities.userId,
        this.utilities.selectedRelativeId
      )
      .then((res: any[]) => {
        console.log("Received AllergiesData details are below -> ");
        console.log(res);
        if (res) {
          this.allergyData = res;
          this.allergyData = this.allergyData.map((obj) => {
            return { ...obj, self_id: obj["allergy_id"] };
          });
          console.log("this.allergyData is below");
          console.log(this.allergyData);

          if (this.allergyData.length > 0) {
            this.allergies = "Comma separation";
            let names = this.allergyData.map((item) => {
              return item["name"];
            });
            console.log("allergies names below -> ");
            console.log(names);
            this.allergies = names.join(", ");
          }
        }
      })
      .catch((error) => {
        this.utilities.sqliteErrorDisplayer(
          "medical-history * loadgetAllergiesData",
          error
        );
        this.utilities.presentToastWarning("Something went wrong");
        console.error(
          "Error -> loadgetAllergiesData() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  loadgetCurrentMedicationsData() {
    this.db
      .getCurrentMedicationsData(
        this.utilities.userId,
        this.utilities.selectedRelativeId
      )
      .then((res: any[]) => {
        console.log("Received CurrentMedicationsData details are below -> ");
        console.log(res);
        if (res) {
          this.currentMedicationData = res;
          this.currentMedicationData = this.currentMedicationData.map((obj) => {
            return { ...obj, self_id: obj["medication_id"] };
          });
          // console.log("this.currentMedicationData is below");
          // console.log(this.currentMedicationData);

          if (this.currentMedicationData.length > 0) {
            this.currentMedications = "Comma separation";
            let names = this.currentMedicationData.map((item) => {
              return item["name"];
            });
            // console.log("currentMedications names below -> ");
            // console.log(names);
            this.currentMedications = names.join(", ");
          }
        }
      })
      .catch((error) => {
        this.utilities.sqliteErrorDisplayer(
          "medical-history * loadgetCurrentMedicationsData",
          error
        );
        this.utilities.presentToastWarning("Something went wrong");
        console.error(
          "Error -> loadgetCurrentMedicationsData() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  loadgetPostMedicationsData() {
    this.db
      .getPostMedicationsData(
        this.utilities.userId,
        this.utilities.selectedRelativeId
      )
      .then((res: any[]) => {
        console.log("Received PostMedicationsData details are below -> ");
        console.log(res);
        if (res) {
          this.postMedicationData = res;
          this.postMedicationData = this.postMedicationData.map((obj) => {
            return { ...obj, self_id: obj["medication_id"] };
          });
          // console.log("this.postMedicationData is below");
          // console.log(this.postMedicationData);

          if (this.postMedicationData.length > 0) {
            this.postMedications = "Comma separation";
            let names = this.postMedicationData.map((item) => {
              return item["name"];
            });
            // console.log("postMedications names below -> ");
            // console.log(names);
            this.postMedications = names.join(", ");
          }
        }
      })
      .catch((error) => {
        this.utilities.sqliteErrorDisplayer(
          "medical-history * loadgetpostMedicationsData",
          error
        );
        this.utilities.presentToastWarning("Something went wrong");
        console.error(
          "Error -> loadgetpostMedicationsData() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  loadgetSurgeriesData() {
    this.db
      .getSurgeriesData(
        this.utilities.userId,
        this.utilities.selectedRelativeId
      )
      .then((res: any[]) => {
        console.log("Received SurgeriesData details are below -> ");
        console.log(res);

        if (res) {
          this.surgeryData = res;
          this.surgeryData = this.surgeryData.map((obj) => {
            return { ...obj, self_id: obj["allergy_id"] };
          });
          // console.log("this.SurgeriesData is below");
          // console.log(this.surgeryData);

          if (this.surgeryData.length > 0) {
            this.surgeries = "Comma separation";
            let names = this.surgeryData.map((item) => {
              return item["name"];
            });
            // console.log("surgeries names below -> ");
            // console.log(names);
            this.surgeries = names.join(", ");
          }
        }
      })
      .catch((error) => {
        this.utilities.sqliteErrorDisplayer(
          "medical-history * loadgetSurgeriesData",
          error
        );
        this.utilities.presentToastWarning("Something went wrong");
        console.error(
          "Error -> loadgetSurgeriesData() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  loadgetInjuriesData() {
    this.db
      .getInjuriesData(this.utilities.userId, this.utilities.selectedRelativeId)
      .then((res: any[]) => {
        console.log("Received injuriesData details are below -> ");
        console.log(res);
        if (res) {
          this.injuryData = res;
          this.injuryData = this.injuryData.map((obj) => {
            return { ...obj, self_id: obj["injury_id"] };
          });
          // console.log("this.injuriesData is below");
          // console.log(this.injuryData);

          if (this.injuryData.length > 0) {
            this.injuries = "Comma separation";
            let names = this.injuryData.map((item) => {
              return item["name"];
            });
            // console.log("injuries names below -> ");
            // console.log(names);
            this.injuries = names.join(", ");
          }
        }
      })
      .catch((error) => {
        this.utilities.sqliteErrorDisplayer(
          "medical-history * loadgetInjuriesData",
          error
        );
        this.utilities.presentToastWarning("Something went wrong");
        console.error(
          "Error -> loadgetInjuriesData() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  loadgetDiseasesData() {
    this.db
      .getDiseasesData(this.utilities.userId, this.utilities.selectedRelativeId)
      .then((res: any[]) => {
        console.log("Received injuriesData details are below -> ");
        console.log(res);
        if (res) {
          this.chronicData = res;
          this.chronicData = this.chronicData.map((obj) => {
            return { ...obj, self_id: obj["disease_id"] };
          });
          // console.log("this.injuriesData is below");
          // console.log(this.chronicData);

          if (this.chronicData.length > 0) {
            this.chronics = "Comma separation";
            let names = this.chronicData.map((item) => {
              return item["name"];
            });
            // console.log("chronics names below -> ");
            // console.log(names);
            this.chronics = names.join(", ");
          }
        }
        this.setMedicalHistories();
      })
      .catch((error) => {
        this.utilities.sqliteErrorDisplayer(
          "medical-history * loadgetDiseasesData",
          error
        );
        this.utilities.presentToastWarning("Something went wrong");
        console.error(
          "Error -> loadgetDiseasesData() function returned error." +
            JSON.stringify(error)
        );
      });
  }

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
        size: "auto",
        redirectTo: "/medical-history-relations",
      },
    ];

    console.log("this.medicalHistories is below");
    console.log(this.medicalHistories);
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
