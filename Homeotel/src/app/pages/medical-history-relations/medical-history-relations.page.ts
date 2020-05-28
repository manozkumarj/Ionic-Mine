import { Component } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-medical-history-relations",
  templateUrl: "./medical-history-relations.page.html",
  styleUrls: ["./medical-history-relations.page.scss"],
})
export class MedicalHistoryRelationsPage {
  relationsWithData: any[] = [];
  diseases: any[] = [];
  relations: any[] = [];
  existingData: any[] = [];

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private db: DatabaseService,
    private loadingController: LoadingController,
    private router: Router
  ) {
    // this.getRelationsMedicalHistories();
  }

  ionViewWillEnter() {
    this.loadRelationsMedicalHistoryMasters();
    // this.getRelationsMedicalHistories();
  }

  async loadRelationsMedicalHistoryMasters() {
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
                "Received getRelationsMedicalHistoryMasters details are below -> "
              );
              console.log(res);
              let lifestyleMasters = res;
              lifestyleMasters.forEach((data) => {
                if (data["master_type"] == "table_disease") {
                  this.diseases.push({
                    disease_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_relation") {
                  this.relations.push({
                    relation_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                }
              });
              this.loadRelationsMedicalHistoryData();
            })
            .catch((error) => {
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadRelationsMedicalHistoryMasters() function returned error." +
                  JSON.stringify(error)
              );
            });
          a.dismiss();
        });
      });
  }

  loadRelationsMedicalHistoryData() {
    this.db
      .getRelationsMedicalHistoryData(
        this.utilities.userId,
        this.utilities.selectedRelativeId
      )
      .then((res: any[]) => {
        console.log(
          "Received RelationsMedicalHistoryData details are below -> "
        );
        console.log(res);
        this.existingData = res[0];
        let i = 0;
        this.relations.forEach((relation) => {
          let tempObj = {};
          let selectedDiseaseIds = [];

          let list = "Select";
          let getCurrentDiseaseData = this.existingData.filter(
            (item) => item.relation_id == relation.relation_id
          );
          if (getCurrentDiseaseData.length > 0) {
            let diseasesNames = getCurrentDiseaseData.map(
              (disease) => disease.diseaseName
            );

            selectedDiseaseIds = getCurrentDiseaseData.map(
              (disease) => disease.disease_id
            );

            list = diseasesNames.join(", ");
          }

          tempObj["id"] = i++;
          tempObj["relation_id"] = relation["relation_id"];
          tempObj["relation_name"] = relation["name"];
          tempObj["list"] = list;
          tempObj["selectedDiseaseIds"] = selectedDiseaseIds;

          this.relationsWithData.push(tempObj);
        });
      })
      .catch((error) => {
        this.utilities.presentToastWarning("Something went wrong");
        console.error(
          "Error -> loadRelationsMedicalHistoryData() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  async getRelationsMedicalHistories() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.getRelationsMedicalHistories().subscribe((data) => {
            a.dismiss();
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
                this.diseases = data[0];
                let relations = data[1];
                this.existingData = data[2];
                let i = 0;
                relations.forEach((relation) => {
                  let tempObj = {};
                  let selectedDiseaseIds = [];

                  let list = "Select";
                  let getCurrentDiseaseData = this.existingData.filter(
                    (item) => item.relation_id == relation.relation_id
                  );
                  if (getCurrentDiseaseData.length > 0) {
                    let diseasesNames = getCurrentDiseaseData.map(
                      (disease) => disease.diseaseName
                    );

                    selectedDiseaseIds = getCurrentDiseaseData.map(
                      (disease) => disease.disease_id
                    );

                    list = diseasesNames.join(", ");
                  }

                  tempObj["id"] = i++;
                  tempObj["relation_id"] = relation["relation_id"];
                  tempObj["relation_name"] = relation["name"];
                  tempObj["list"] = list;
                  tempObj["selectedDiseaseIds"] = selectedDiseaseIds;

                  this.relationsWithData.push(tempObj);
                });

                console.log("Data returned from backend");
              }
            }
          });
        });
      });
  }

  redirect(id) {
    console.log("Selected ID -> " + id);
    console.log(this.relationsWithData[id]);
    console.log("Diseases masters -> ");
    console.log(this.diseases);

    this.utilities.relationsMedicalHistoryPageState[
      "selectedMedicalHistory"
    ] = this.relationsWithData[id];

    this.utilities.relationsMedicalHistoryPageState[
      "diseasesMaster"
    ] = this.diseases;

    this.router.navigate(["/edit-relation-medical-history"]);
  }
}
