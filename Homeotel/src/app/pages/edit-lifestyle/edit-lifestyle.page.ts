import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-edit-lifestyle",
  templateUrl: "./edit-lifestyle.page.html",
  styleUrls: ["./edit-lifestyle.page.scss"],
})
export class EditLifestylePage implements OnInit {
  title;
  options: any[] = [];

  currentItemValue;
  columnName = "";
  backwardLink;
  forwardLink;
  question;
  currentQuestion;

  masterDataTag;

  constructor(
    private activatedRoute: ActivatedRoute,
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private db: DatabaseService,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.currentQuestion = null;
    let paramOne = parseInt(this.activatedRoute.snapshot.paramMap.get("one"));
    let paramTwo = parseInt(this.activatedRoute.snapshot.paramMap.get("two"));
    let paramThree = parseInt(
      this.activatedRoute.snapshot.paramMap.get("three")
    );
    let paramFour = parseInt(this.activatedRoute.snapshot.paramMap.get("four"));
    let paramFive = parseInt(this.activatedRoute.snapshot.paramMap.get("five"));
    let paramSix = parseInt(this.activatedRoute.snapshot.paramMap.get("six"));
    let paramSeven = parseInt(
      this.activatedRoute.snapshot.paramMap.get("seven")
    );

    console.log("this.utilities.lifestylePageState-selectedLifestyle is below");
    console.log(this.utilities.lifestylePageState["selectedLifestyle"]);

    let value = this.utilities.lifestylePageState["selectedLifestyle"]["value"];

    if (paramSeven) {
      console.log("paramSeven");
      this.title = `${paramSeven} of 7`;
      this.backwardLink = `/edit-lifestyle/1/2/3/4/5/6`;
      this.forwardLink = `/lifestyle`;
      this.question = "Heat preference";
      this.currentQuestion = "seven";
      this.masterDataTag = "m_heat";
      this.currentItemValue = this.utilities.lifestylePageState["heatId"];
    } else if (paramSix) {
      console.log("paramSix");
      this.title = `${paramSix} of 7`;
      this.backwardLink = `/edit-lifestyle/1/2/3/4/5`;
      this.forwardLink = `/edit-lifestyle/1/2/3/4/5/6/7`;
      this.question = "Likable Food preference";
      this.currentQuestion = "six";
      this.masterDataTag = "m_food";
      this.currentItemValue = this.utilities.lifestylePageState["foodId"];
    } else if (paramFive) {
      console.log("paramFive");
      this.title = `${paramFive} of 7`;
      this.backwardLink = `/edit-lifestyle/1/2/3/4`;
      this.forwardLink = `/edit-lifestyle/1/2/3/4/5/6`;
      this.question = "Profession";
      this.currentQuestion = "five";
      this.masterDataTag = "m_profession";
      this.currentItemValue = this.utilities.lifestylePageState["professionId"];
    } else if (paramFour) {
      console.log("paramFour");
      this.title = `${paramFour} of 7`;
      this.backwardLink = `/edit-lifestyle/1/2/3`;
      this.forwardLink = `/edit-lifestyle/1/2/3/4/5`;
      this.question = "Activity level";
      this.currentQuestion = "four";
      this.masterDataTag = "m_activity";
      this.currentItemValue = this.utilities.lifestylePageState["activityId"];
    } else if (paramThree) {
      console.log("paramThree");
      this.title = `${paramThree} of 7`;
      this.backwardLink = `/edit-lifestyle/1/2`;
      this.forwardLink = `/edit-lifestyle/1/2/3/4`;
      this.question = "Excercise";
      this.currentQuestion = "three";
      this.masterDataTag = "m_excercise";
      this.currentItemValue = this.utilities.lifestylePageState["excerciseId"];
    } else if (paramTwo) {
      console.log("paramTwo");
      this.title = `${paramTwo} of 7`;
      this.backwardLink = `/edit-lifestyle/1`;
      this.forwardLink = `/edit-lifestyle/1/2/3`;
      this.question = "Alcohol";
      this.currentQuestion = "two";
      this.masterDataTag = "m_alcohol";
      this.currentItemValue = this.utilities.lifestylePageState["alcoholId"];
    } else if (paramOne) {
      console.log("paramOne");
      this.title = `${paramOne} of 7`;
      this.backwardLink = `/lifestyle`;
      this.forwardLink = `/edit-lifestyle/1/2`;
      this.question = "Smoking";
      this.currentQuestion = "one";
      this.masterDataTag = "m_smoking";
      this.currentItemValue = this.utilities.lifestylePageState["smokingId"];
    }

    let currentMasters = this.utilities.lifestylePageState[this.masterDataTag];
    console.log("Current master data is below");
    console.log(currentMasters);

    this.options = currentMasters;
  }

  ngOnInit() {}

  answered = async (id) => {
    console.log("answered -> " + this.currentQuestion);
    console.log("id -> " + id);

    let smokingId =
      this.currentQuestion == "one"
        ? id
        : this.utilities.lifestylePageState["smokingId"];
    this.utilities.lifestylePageState["smokingId"] = smokingId;

    let alcoholId =
      this.currentQuestion == "two"
        ? id
        : this.utilities.lifestylePageState["alcoholId"];
    this.utilities.lifestylePageState["alcoholId"] = alcoholId;

    let excerciseId =
      this.currentQuestion == "three"
        ? id
        : this.utilities.lifestylePageState["excerciseId"];
    this.utilities.lifestylePageState["excerciseId"] = excerciseId;

    let activityId =
      this.currentQuestion == "four"
        ? id
        : this.utilities.lifestylePageState["activityId"];
    this.utilities.lifestylePageState["activityId"] = activityId;

    let professionId =
      this.currentQuestion == "five"
        ? id
        : this.utilities.lifestylePageState["professionId"];
    this.utilities.lifestylePageState["professionId"] = professionId;

    let foodId =
      this.currentQuestion == "six"
        ? id
        : this.utilities.lifestylePageState["foodId"];
    this.utilities.lifestylePageState["foodId"] = foodId;

    let heatId =
      this.currentQuestion == "seven"
        ? id
        : this.utilities.lifestylePageState["heatId"];
    this.utilities.lifestylePageState["heatId"] = heatId;

    console.log(
      smokingId +
        "--" +
        alcoholId +
        "--" +
        excerciseId +
        "--" +
        activityId +
        "--" +
        professionId +
        "--" +
        foodId +
        "--" +
        heatId
    );

    const loading = await this.loadingController
      .create({
        message: "Saving...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService
            .updateUserLifestyleDetails(
              smokingId,
              alcoholId,
              excerciseId,
              activityId,
              professionId,
              foodId,
              heatId
            )
            .subscribe((data) => {
              console.log("Returned from Backend");
              console.log(JSON.stringify(data));
              if (this.utilities.isInvalidApiResponseData(data)) {
                a.dismiss();
                console.log("Returned Error");
                console.log(data[0][0]);
                if (data[0][0]["error"]) {
                  console.log("Something went wrong");
                  this.utilities.presentToastWarning("Something went wrong");
                }
              } else {
                console.log("Returned Success");
                let res = data[0][0];
                if (data[0][0]["query"]) {
                  let receivedQuery = res["query"];
                  console.log(receivedQuery);

                  this.db
                    .crudOperations(receivedQuery)
                    .then((res) => {
                      a.dismiss();
                      console.log("Lifestyle is saved successfully");
                    })
                    .catch((error) => {
                      a.dismiss();
                      console.error(
                        "Error -> Edit lifestype save function returned error." +
                          JSON.stringify(error)
                      );
                    });
                } else {
                  a.dismiss();
                  console.log("Query property is not received from backend SP");
                }
                if (this.currentQuestion == "seven") {
                  this.utilities.presentToastSuccess("Updated successfully");
                  this.router.navigate(["/health-records"]);
                } else {
                  this.router.navigate([this.forwardLink]);
                }
              }
            });
        });
      });
  };
}
