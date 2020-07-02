import { Component } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";
import { Validators, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-lifestyle",
  templateUrl: "./lifestyle.page.html",
  styleUrls: ["./lifestyle.page.scss"],
})
export class LifestylePage {
  lifestyleForm;
  lifestyles;

  smoking = "Select";
  alcohol = "Select";
  excercise = "Select";
  activity = "Select";
  profession = "Select";
  food = "Select";
  heat = "Select";

  smokingId: number = null;
  alcoholId: number = null;
  excerciseId: number = null;
  activityId: number = null;
  professionId: number = null;
  foodId: number = null;
  heatId: number = null;

  m_smoking: any[] = [];
  m_alcohol: any[] = [];
  m_excercise: any[] = [];
  m_activity: any[] = [];
  m_profession: any[] = [];
  m_food: any[] = [];
  m_heat: any[] = [];
  m_memory: any[] = [];
  m_appetite: any[] = [];
  m_thirst: any[] = [];
  m_intolerance: any[] = [];
  m_sleep: any[] = [];
  m_postureOfSleep: any[] = [];
  m_sweatQuantity: any[] = [];
  m_sweatSmell: any[] = [];
  m_urineQty: any[] = [];
  m_urineSmell: any[] = [];
  m_urineFlow: any[] = [];
  m_bowelsPeriodicity: any[] = [];
  m_bowelsConsistency: any[] = [];
  m_tongueStatus: any[] = [];
  m_bathingPreference: any[] = [];
  m_seasonPreference: any[] = [];
  m_coveringPreference: any[] = [];
  m_airType: any[] = [];
  m_openAirPreference: any[] = [];
  m_symptomsMensis: any[] = [];
  m_menopause: any[] = [
    {
      id: 1,
      name: "Yes",
    },
    {
      id: 2,
      name: "No",
    },
  ];
  m_pregnant: any[] = [
    {
      id: 1,
      name: "Yes",
    },
    {
      id: 2,
      name: "No",
    },
  ];

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private db: DatabaseService,
    private router: Router
  ) {
    this.lifestyleForm = new FormGroup({
      smoking_id: new FormControl("", Validators.required),
      alcohol_id: new FormControl("", Validators.required),
      excercise_id: new FormControl("", Validators.required),
      activity_level_id: new FormControl("", Validators.required),
      profession_id: new FormControl("", Validators.required),
      food_id: new FormControl("", Validators.required),
      heat_id: new FormControl("", Validators.required),
      memory_id: new FormControl("", Validators.required),
      appetite_id: new FormControl("", Validators.required),
      habits: new FormControl("", Validators.required),
      thirst_id: new FormControl("", Validators.required),
      aversions: new FormControl("", Validators.required),
      desires: new FormControl("", Validators.required),
      intolerance_id: new FormControl("", Validators.required),
      desires_during_childhood: new FormControl("", Validators.required),
      sleep_id: new FormControl("", Validators.required),
      posture_of_sleep_id: new FormControl("", Validators.required),
      other_sleep_posture: new FormControl("", Validators.required),
      dreams: new FormControl("", Validators.required),
      sweat: new FormControl("", Validators.required),
      sweat_quantity: new FormControl("", Validators.required),
      sweat_smell_id: new FormControl("", Validators.required),
      life_situation: new FormControl("", Validators.required),
      urine_qty_id: new FormControl("", Validators.required),
      urine_smell_id: new FormControl("", Validators.required),
      urine_flow_id: new FormControl("", Validators.required),
      urine_color: new FormControl("", Validators.required),
      urine_times_in_day: new FormControl("", Validators.required),
      urine_times_in_night: new FormControl("", Validators.required),
      bowels_times_in_day: new FormControl("", Validators.required),
      bowels_times_in_night: new FormControl("", Validators.required),
      bowels_periodicity_id: new FormControl("", Validators.required),
      bowels_consistency_id: new FormControl("", Validators.required),
      bowels_color_of_stool: new FormControl("", Validators.required),
      tongue_color: new FormControl("", Validators.required),
      tongue_back_coating: new FormControl("", Validators.required),
      tongue_front_coating: new FormControl("", Validators.required),
      tongue_entire_coating: new FormControl("", Validators.required),
      tongue_tyep_id: new FormControl("", Validators.required),
      bathing_preference_id: new FormControl("", Validators.required),
      season_preference_id: new FormControl("", Validators.required),
      covering_preference_id: new FormControl("", Validators.required),
      air_type_id: new FormControl("", Validators.required),
      open_air_id: new FormControl("", Validators.required),
      menarche: new FormControl("", Validators.required),
      mensis: new FormControl("", Validators.required),
      lmp: new FormControl("", Validators.required),
      symptoms_before_mensis_id: new FormControl("", Validators.required),
      symptoms_during_mensis_id: new FormControl("", Validators.required),
      symptoms_after_mensis_id: new FormControl("", Validators.required),
      menopause: new FormControl("", Validators.required),
      pregnant: new FormControl("", Validators.required),
      no_of_deliveries: new FormControl("", Validators.required),
      no_of_children: new FormControl("", Validators.required),
      intra_uterine_deaths: new FormControl("", Validators.required),
      abortions: new FormControl("", Validators.required),
    });

    this.loadLifestyles();
  }

  ionViewWillEnter() {
    console.clear();
    this.loadLifestyleMastersForWeb();
    if (this.utilities.isHybridApp) {
      this.loadLifestyleMasters();
      this.loadLifestyleData();
    } else {
      // this.getLifestyles();
      console.log("Need to make an API call");
    }
  }

  selectedColumn(columnName) {
    let columnValue = this.lifestyleForm.get(columnName).value;
    columnValue = columnValue.toString();
    console.log("columnName --> " + columnName);
    console.log("columnValue --> " + columnValue);
    if (columnValue.trim()) {
      console.log("Can upsert this column");
    }
  }

  loadLifestyles() {
    this.lifestyles = [
      {
        id: 0,
        name: "Smoking",
        tag: "smoking",
        list: this.smoking,
        value: this.smokingId,
        masterDataTag: "m_smoking",
        redirectTo: "/edit-lifestyle/1",
      },
      {
        id: 1,
        name: "Alcohol",
        tag: "alcohol",
        list: this.alcohol,
        value: this.alcoholId,
        masterDataTag: "m_alcohol",
        redirectTo: "/edit-lifestyle/1/2",
      },
      {
        id: 2,
        name: "Excercise",
        tag: "excercise",
        list: this.excercise,
        value: this.excerciseId,
        masterDataTag: "m_excercise",
        redirectTo: "/edit-lifestyle/1/2/3",
      },
      {
        id: 3,
        name: "Activity level",
        tag: "activity",
        list: this.activity,
        value: this.activityId,
        masterDataTag: "m_activity",
        redirectTo: "/edit-lifestyle/1/2/3/4",
      },
      {
        id: 4,
        name: "Profession",
        tag: "profession",
        list: this.profession,
        value: this.professionId,
        masterDataTag: "m_profession",
        redirectTo: "/edit-lifestyle/1/2/3/4/5",
      },
      {
        id: 5,
        name: "Food preferences",
        tag: "food",
        list: this.food,
        value: this.foodId,
        masterDataTag: "m_food",
        redirectTo: "/edit-lifestyle/1/2/3/4/5/6",
      },
      {
        id: 6,
        name: "Heat preferences",
        tag: "heat",
        list: this.heat,
        value: this.heatId,
        masterDataTag: "m_heat",
        redirectTo: "/edit-lifestyle/1/2/3/4/5/6/7",
      },
    ];
  }

  async getLifestyles() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.getLifestyles().subscribe((data) => {
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
                console.log("Data returned from backend");

                this.m_smoking = data[0];
                this.m_smoking = this.m_smoking.map((item) => {
                  return { ...item, self_id: item["smoking_id"] };
                });
                this.utilities.lifestylePageState["m_smoking"] = this.m_smoking;
                console.log("this.m_smoking is below");
                console.log(this.m_smoking);

                this.m_alcohol = data[1];
                this.m_alcohol = this.m_alcohol.map((item) => {
                  return { ...item, self_id: item["alcohol_id"] };
                });
                this.utilities.lifestylePageState["m_alcohol"] = this.m_alcohol;
                console.log("this.m_alcohol is below");
                console.log(this.m_alcohol);

                this.m_excercise = data[2];
                this.m_excercise = this.m_excercise.map((item) => {
                  return { ...item, self_id: item["excercise_id"] };
                });
                this.utilities.lifestylePageState[
                  "m_excercise"
                ] = this.m_excercise;
                console.log("this.m_excercise is below");
                console.log(this.m_excercise);

                this.m_activity = data[3];
                this.m_activity = this.m_activity.map((item) => {
                  return { ...item, self_id: item["activity_level_id"] };
                });
                this.utilities.lifestylePageState[
                  "m_activity"
                ] = this.m_activity;
                console.log("this.m_activity_level is below");
                console.log(this.m_activity);

                this.m_profession = data[4];
                this.m_profession = this.m_profession.map((item) => {
                  return { ...item, self_id: item["profession_id"] };
                });
                this.utilities.lifestylePageState[
                  "m_profession"
                ] = this.m_profession;
                console.log("this.m_profession is below");
                console.log(this.m_profession);

                this.m_food = data[5];
                this.m_food = this.m_food.map((item) => {
                  return { ...item, self_id: item["food_id"] };
                });
                this.utilities.lifestylePageState["m_food"] = this.m_food;
                console.log("this.m_food is below");
                console.log(this.m_food);

                this.m_heat = data[6];
                this.m_heat = this.m_heat.map((item) => {
                  return { ...item, self_id: item["heat_id"] };
                });
                this.utilities.lifestylePageState["m_heat"] = this.m_heat;
                console.log("this.m_heat is below");
                console.log(this.m_heat);

                if (data[7].length > 0) {
                  let smokingInfo = data[7][0];
                  console.log("smoking is below");
                  console.log(smokingInfo);
                  this.smokingId = smokingInfo["smoking_id"];
                  this.smoking = smokingInfo["name"];
                }
                this.utilities.lifestylePageState["smokingId"] = this.smokingId;

                if (data[8].length > 0) {
                  let alcoholInfo = data[8][0];
                  console.log("alcohol is below");
                  console.log(alcoholInfo);
                  this.alcoholId = alcoholInfo["alcohol_id"];
                  this.alcohol = alcoholInfo["name"];
                }
                this.utilities.lifestylePageState["alcoholId"] = this.alcoholId;

                if (data[9].length > 0) {
                  let excerciseInfo = data[9][0];
                  console.log("excercise is below");
                  console.log(excerciseInfo);
                  this.excerciseId = excerciseInfo["excercise_id"];
                  this.excercise = excerciseInfo["name"];
                }
                this.utilities.lifestylePageState[
                  "excerciseId"
                ] = this.excerciseId;

                if (data[10].length > 0) {
                  let activityInfo = data[10][0];
                  console.log("activity is below");
                  console.log(activityInfo);
                  this.activityId = activityInfo["activity_level_id"];
                  this.activity = activityInfo["name"];
                }
                this.utilities.lifestylePageState[
                  "activityId"
                ] = this.activityId;

                if (data[11].length > 0) {
                  let professionInfo = data[11][0];
                  console.log("profession is below");
                  console.log(professionInfo);
                  this.professionId = professionInfo["profession_id"];
                  this.profession = professionInfo["name"];
                }
                this.utilities.lifestylePageState[
                  "professionId"
                ] = this.professionId;

                if (data[12].length > 0) {
                  let foodInfo = data[12][0];
                  console.log("food is below");
                  console.log(foodInfo);
                  this.foodId = foodInfo["food_id"];
                  this.food = foodInfo["name"];
                }
                this.utilities.lifestylePageState["foodId"] = this.foodId;

                if (data[13].length > 0) {
                  let heatInfo = data[13][0];
                  console.log("heat is below");
                  console.log(heatInfo);
                  this.heatId = heatInfo["heat_id"];
                  this.heat = heatInfo["name"];
                }
                this.utilities.lifestylePageState["heatId"] = this.heatId;

                this.loadLifestyles();
              } else {
                console.log("Something went wrong in data");
              }
            }
          });
        });
      });
  }

  async loadLifestyleMastersForWeb() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.getLifestylesMasters().subscribe((data) => {
            console.log(
              "Received loadLifestyleMastersForWeb details are below -> "
            );
            console.log(data);
            if (this.utilities.isInvalidApiResponseData(data)) {
              a.dismiss();
              console.log("Returned Error");
            } else {
              if (
                typeof data != "undefined" &&
                typeof data[0] != "undefined" &&
                typeof data[0][0] != "undefined"
              ) {
                console.log("Backend success");
                const masterData = data[0];
                console.log(masterData);
                masterData.forEach((data) => {
                  if (data["MASTER_TYPE"].toLowerCase() === "smoking") {
                    this.m_smoking.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (data["MASTER_TYPE"].toLowerCase() === "alcohol") {
                    this.m_alcohol.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "excercise"
                  ) {
                    this.m_excercise.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "activity_level"
                  ) {
                    this.m_activity.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "profession"
                  ) {
                    this.m_profession.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (data["MASTER_TYPE"].toLowerCase() === "food") {
                    this.m_food.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (data["MASTER_TYPE"].toLowerCase() === "heat") {
                    this.m_heat.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (data["MASTER_TYPE"].toLowerCase() === "memory") {
                    this.m_memory.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (data["MASTER_TYPE"].toLowerCase() === "appetite") {
                    this.m_appetite.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (data["MASTER_TYPE"].toLowerCase() === "thirst") {
                    this.m_thirst.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "intolerance"
                  ) {
                    this.m_intolerance.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (data["MASTER_TYPE"].toLowerCase() === "sleep") {
                    this.m_sleep.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "posture_of_sleep"
                  ) {
                    this.m_postureOfSleep.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "sweat_quantity"
                  ) {
                    this.m_sweatQuantity.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "sweat_smell"
                  ) {
                    this.m_sweatSmell.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "urine_qty"
                  ) {
                    this.m_urineQty.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "urine_smell"
                  ) {
                    this.m_urineSmell.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "urine_flow"
                  ) {
                    this.m_urineFlow.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "bowels_periodicity"
                  ) {
                    this.m_bowelsPeriodicity.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "bowels_consistency"
                  ) {
                    this.m_bowelsConsistency.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "tongue_type"
                  ) {
                    this.m_tongueStatus.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "bathing_reference"
                  ) {
                    this.m_bathingPreference.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "season_preference"
                  ) {
                    this.m_seasonPreference.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "covering_preference"
                  ) {
                    this.m_coveringPreference.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (data["MASTER_TYPE"].toLowerCase() === "air_type") {
                    this.m_airType.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (data["MASTER_TYPE"].toLowerCase() === "open_air") {
                    this.m_openAirPreference.push({
                      id: data.id,
                      name: data.name,
                    });
                  } else if (
                    data["MASTER_TYPE"].toLowerCase() === "symptoms_mensis"
                  ) {
                    this.m_symptomsMensis.push({
                      id: data.id,
                      name: data.name,
                    });
                  }
                });
                a.dismiss();
              }
            }
          });
        });
      });
  }

  async loadLifestyleMasters() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getLifestyleMasters()
            .then((res: any[]) => {
              console.log("Received lifestyleMasters details are below -> ");
              console.log(res);
              let lifestyleMasters = res;
              lifestyleMasters.forEach((data) => {
                if (data["master_type"] == "table_smoking") {
                  this.m_smoking.push({
                    smoking_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_alcohol") {
                  this.m_alcohol.push({
                    alcohol_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_excercise") {
                  this.m_excercise.push({
                    excercise_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_activity_level") {
                  this.m_activity.push({
                    activity_level_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_profession") {
                  this.m_profession.push({
                    profession_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_food") {
                  this.m_food.push({
                    food_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                } else if (data["master_type"] == "table_heat") {
                  this.m_heat.push({
                    heat_id: data.id,
                    name: data.name,
                    self_id: data.id,
                  });
                }
              });
              this.utilities.lifestylePageState["m_smoking"] = this.m_smoking;
              this.utilities.lifestylePageState["m_alcohol"] = this.m_alcohol;
              this.utilities.lifestylePageState[
                "m_excercise"
              ] = this.m_excercise;
              this.utilities.lifestylePageState["m_activity"] = this.m_activity;
              this.utilities.lifestylePageState[
                "m_profession"
              ] = this.m_profession;
              this.utilities.lifestylePageState["m_food"] = this.m_food;
              this.utilities.lifestylePageState["m_heat"] = this.m_heat;
              this.loadLifestyleData();
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "lifestyle * loadLifestyleMasters",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadLifestyleMasters() function returned error." +
                  JSON.stringify(error)
              );
              this.loadLifestyleData();
            });
          a.dismiss();
        });
      });
  }

  loadLifestyleData() {
    this.db
      .getLifestyles(this.utilities.userId, this.utilities.selectedRelativeId)
      .then((res: any[]) => {
        console.log("Received lifestyleData details are below -> ");
        // console.log(JSON.stringify(lifestyleDetails));
        console.log(res);
        let lifestyleData = res[0];
        console.log(lifestyleData);
        if (lifestyleData) {
          // Smoking data
          this.smokingId = lifestyleData["smoking_id"];
          let smokeIndex = this.m_smoking.findIndex(
            (id) => id.smoking_id == this.smokingId
          );
          this.smoking = this.m_smoking[smokeIndex]["name"];
          this.utilities.lifestylePageState["smokingId"] = this.smokingId;

          console.log("this.smokingId --> " + this.smokingId);
          console.log("smokeIndex --> " + smokeIndex);
          console.log("this.smoking --> " + this.smoking);

          // alcohol data
          this.alcoholId = lifestyleData["alcohol_id"];
          let alcoholIndex = this.m_alcohol.findIndex(
            (id) => id.alcohol_id == this.alcoholId
          );
          this.alcohol = this.m_alcohol[alcoholIndex]["name"];
          this.utilities.lifestylePageState["alcoholId"] = this.alcoholId;

          // excercise data
          this.excerciseId = lifestyleData["excercise_id"];
          let excerciseIndex = this.m_excercise.findIndex(
            (id) => id.excercise_id == this.excerciseId
          );
          this.excercise = this.m_excercise[excerciseIndex]["name"];
          this.utilities.lifestylePageState["excerciseId"] = this.excerciseId;

          // activity data
          this.activityId = lifestyleData["activity_level_id"];
          let activityIdIndex = this.m_activity.findIndex(
            (id) => id.activity_level_id == this.activityId
          );
          this.activity = this.m_activity[activityIdIndex]["name"];
          this.utilities.lifestylePageState["activityId"] = this.activityId;

          // profession data
          this.professionId = lifestyleData["profession_id"];
          let professionIndex = this.m_profession.findIndex(
            (id) => id.profession_id == this.professionId
          );
          this.profession = this.m_profession[professionIndex]["name"];
          this.utilities.lifestylePageState["professionId"] = this.professionId;

          // food data
          this.foodId = lifestyleData["food_id"];
          let foodIndex = this.m_food.findIndex(
            (id) => id.food_id == this.foodId
          );
          this.food = this.m_food[foodIndex]["name"];
          this.utilities.lifestylePageState["foodId"] = this.foodId;

          // heat data
          this.heatId = lifestyleData["heat_id"];
          let heatIndex = this.m_heat.findIndex(
            (id) => id.heat_id == this.heatId
          );
          this.heat = this.m_heat[heatIndex]["name"];
          this.utilities.lifestylePageState["heatId"] = this.heatId;
        }
        this.loadLifestyles();
        console.log("this.utilities.lifestylePageState are below");
        console.log(this.utilities.lifestylePageState);
      })
      .catch((error) => {
        this.utilities.sqliteErrorDisplayer(
          "lifestyle * loadlifestyleData",
          error
        );
        console.error(
          "Error -> loadlifestyleData() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  redirect(id) {
    console.log("Selected ID -> " + id);
    console.log(this.lifestyles[id]);
    this.utilities.lifestylePageState["selectedLifestyle"] = this.lifestyles[
      id
    ];

    this.router.navigate([this.lifestyles[id]["redirectTo"]]);
  }
}
