import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-medical-history-relations",
  templateUrl: "./medical-history-relations.page.html",
  styleUrls: ["./medical-history-relations.page.scss"],
})
export class MedicalHistoryRelationsPage implements OnInit {
  relationsWithData: any[] = [];
  diseases: any[] = [];
  existingData: any[] = [];

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.getRelationsMedicalHistories();
  }

  getRelationsMedicalHistories() {
    this.apiService.getRelationsMedicalHistories().subscribe((data) => {
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
  }

  ngOnInit() {}

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
