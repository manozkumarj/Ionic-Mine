import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WheelSelector } from "@ionic-native/wheel-selector/ngx";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-vital-questions",
  templateUrl: "./vital-questions.page.html",
  styleUrls: ["./vital-questions.page.scss"],
})
export class VitalQuestionsPage implements OnInit {
  currentQuestion;

  title;
  backwardLink;
  forwardLink;
  question;

  systolicDiastolicOptions;
  pulseRates;
  respiratoryRates;

  selectedTemperature;

  selectedSystolic;

  selectedDiastolic;

  selectedPulserate;

  selectedRespiratoryrate;

  selectedBp = "-NA-";

  temperatureLeftValue = "0";
  temperatureRightValue = "0";
  systolicValue = "0";
  diastolicValue = "0";
  pulserateValue = "0";
  respiratoryrateValue = "0";

  systolicOptions: any[] = [];
  diastolicOptions: any[] = [];
  temperatureLeftSideOptions: any[] = [];
  temperatureRightSideOptions: any[] = [];
  pulserateOptions: any[] = [];
  respiratoryrateOptions: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private selector: WheelSelector,
    private db: DatabaseService,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
    console.clear();
    console.log("this.utilities.vitalPageState is below");
    console.log(this.utilities.vitalPageState);
    this.currentQuestion = null;
    let paramOne = parseInt(this.activatedRoute.snapshot.paramMap.get("one"));
    let paramTwo = parseInt(this.activatedRoute.snapshot.paramMap.get("two"));
    let paramThree = parseInt(
      this.activatedRoute.snapshot.paramMap.get("three")
    );
    let paramFour = parseInt(this.activatedRoute.snapshot.paramMap.get("four"));

    if (paramFour) {
      console.log("paramFour");
      this.title = `${paramFour} of 4`;
      this.backwardLink = `/vital-questions/1/2/3`;
      this.forwardLink = `/vitals`;
      this.question = "Please select blood pressure?";
      this.currentQuestion = "four";

      let getSystolic = this.utilities.vitalPageState["bp_systolic"];
      this.selectedSystolic = getSystolic ? getSystolic : "-NA-";
      this.systolicValue = getSystolic ? getSystolic.toString() : "0";

      let getDiastolic = this.utilities.vitalPageState["bp_diastolic"];
      this.selectedDiastolic = getDiastolic ? getDiastolic : "-NA-";
      this.diastolicValue = getDiastolic ? getDiastolic.toString() : "0";

      console.log(
        "bp values -> " + this.selectedSystolic + "-" + this.selectedDiastolic
      );
      // Generating Systolic options
      for (let i = 0; i <= 200; i++) {
        this.systolicOptions.push({ description: i.toString() });
      }
      // Generating Diastolic options
      for (let i = 0; i <= 200; i++) {
        this.diastolicOptions.push({ description: i.toString() });
      }

      console.log("systolicOptions are below");
      console.log(this.systolicOptions);
      console.log("diastolicOptions are below");
      console.log(this.diastolicOptions);
      this.selectBP();
    } else if (paramThree) {
      console.log("paramThree");
      this.title = `${paramThree} of 4`;
      this.backwardLink = `/vital-questions/1/2`;
      this.forwardLink = `/vital-questions/1/2/3/4`;
      this.question = "Please select respiratory rate?";
      this.currentQuestion = "three";

      let getRespiratoryrate = this.utilities.vitalPageState["respiratoryrate"];

      this.selectedRespiratoryrate = getRespiratoryrate
        ? getRespiratoryrate
        : "-N/A-";

      this.respiratoryrateValue = getRespiratoryrate
        ? getRespiratoryrate.toString()
        : "0";

      console.log("respiratoryrate value -> " + getRespiratoryrate);
      // Generating respiratoryrate options
      for (let i = 0; i <= 200; i++) {
        this.respiratoryrateOptions.push({ description: i.toString() });
      }
      console.log("respiratoryrateOptions are below");
      console.log(this.respiratoryrateOptions);
      this.selectRespiratoryrate();
    } else if (paramTwo) {
      console.log("paramTwo");
      this.title = `${paramTwo} of 4`;
      this.backwardLink = `/vital-questions/1`;
      this.forwardLink = `/vital-questions/1/2/3`;
      this.question = "Please select pulse rate?";
      this.currentQuestion = "two";

      let getPulserate = this.utilities.vitalPageState["pulserate"];
      this.selectedPulserate = getPulserate ? getPulserate.toString() : "-N/A-";

      console.log("pulserate value -> " + getPulserate);
      this.pulserateValue = getPulserate ? getPulserate.toString() : "0";
      // Generating pulserate options
      for (let i = 0; i <= 200; i++) {
        this.pulserateOptions.push({ description: i.toString() });
      }
      console.log("pulserateOptions are below");
      console.log(this.pulserateOptions);
      this.selectPulserate();
    } else if (paramOne) {
      console.log("paramOne");
      this.title = `${paramOne} of 4`;
      this.backwardLink = `/vitals`;
      this.forwardLink = `/vital-questions/1/2`;
      this.question = "Please select temperature?";
      this.currentQuestion = "one";

      this.selectedTemperature = this.utilities.vitalPageState["temperature"]
        ? this.utilities.vitalPageState["temperature"].toString()
        : "0.0";

      let value = this.selectedTemperature;
      this.selectedTemperature = value;
      console.log("temperature value -> " + value);
      let splitTemperature = this.selectedTemperature.split(".");
      this.temperatureLeftValue = splitTemperature[0].toString();
      this.temperatureRightValue = splitTemperature[1].toString();

      // Generating Temperature options
      for (let i = 0; i <= 99; i++) {
        this.temperatureRightSideOptions.push({ description: i.toString() });
      }
      for (let i = 0; i <= 200; i++) {
        this.temperatureLeftSideOptions.push({ description: i.toString() });
      }

      console.log("temperatureLeftSideOptions are below");
      console.log(this.temperatureLeftSideOptions);

      console.log("temperatureRightSideOptions are below");
      console.log(this.temperatureRightSideOptions);
      this.selectTemperature();
    }
  }

  selectBP() {
    this.selector
      .show({
        title: "Select Systolic & Diastolic",
        items: [this.systolicOptions, this.diastolicOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "light",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.systolicOptions[this.systolicValue].description,
          },
          {
            index: 1,
            value: this.diastolicOptions[this.diastolicValue].description,
          },
        ],
      })
      .then(
        (result) => {
          console.log(
            "Selected Systolic value is --> " + result[0].description
          );
          console.log(result[0].description + " at index: " + result[0].index);
          this.systolicValue = result[0].index;
          this.selectedSystolic = result[0].description;
          this.utilities.vitalPageState["bp_systolic"] = this.selectedSystolic;

          console.log(
            "Selected Diastolic value is --> " + result[1].description
          );
          console.log(result[1].description + " at index: " + result[1].index);
          this.diastolicValue = result[1].index;
          this.selectedDiastolic = result[1].description;
          this.utilities.vitalPageState[
            "bp_diastolic"
          ] = this.selectedDiastolic;
        },
        (err) => console.log("Error: ", err)
      );
  }

  selectPulserate() {
    this.selector
      .show({
        title: "Select Pulserate",
        items: [this.pulserateOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "light",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.pulserateOptions[this.pulserateValue].description,
          },
        ],
      })
      .then(
        (result) => {
          console.log(
            "Selected selectedPulserate value is --> " + result[0].description
          );
          console.log(result[0].description + " at index: " + result[0].index);
          this.pulserateValue = result[0].index;
          this.selectedPulserate = result[0].description;
          this.utilities.vitalPageState["pulserate"] = this.selectedPulserate;
        },
        (err) => console.log("Error: ", err)
      );
  }

  selectTemperature() {
    this.selector
      .show({
        title: "Select Temperature",
        items: [
          this.temperatureLeftSideOptions,
          this.temperatureRightSideOptions,
        ],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "light",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.temperatureLeftSideOptions[this.temperatureLeftValue]
              .description,
          },
          {
            index: 1,
            value: this.temperatureRightSideOptions[this.temperatureRightValue]
              .description,
          },
        ],
      })
      .then(
        (result) => {
          console.log(
            "Selected Temperature left value is --> " + result[0].description
          );
          console.log(result[0].description + " at index: " + result[0].index);
          this.temperatureLeftValue = result[0].index;

          console.log(
            "Selected Temperature right value is --> " + result[1].description
          );
          console.log(result[1].description + " at index: " + result[1].index);
          this.temperatureRightValue = result[1].index;

          this.selectedTemperature =
            result[0].description + "." + result[1].description;

          this.utilities.vitalPageState[
            "temperature"
          ] = this.selectedTemperature;
        },
        (err) => console.log("Error: ", err)
      );
  }

  selectRespiratoryrate() {
    this.selector
      .show({
        title: "Select Respiratoryrate",
        items: [this.respiratoryrateOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "light",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.respiratoryrateOptions[this.respiratoryrateValue]
              .description,
          },
        ],
      })
      .then(
        (result) => {
          console.log(
            "Selected Respiratoryrate value is --> " + result[0].description
          );
          console.log(result[0].description + " at index: " + result[0].index);
          this.respiratoryrateValue = result[0].index;
          this.selectedRespiratoryrate = result[0].description;
          this.utilities.vitalPageState[
            "respiratoryrate"
          ] = this.selectedRespiratoryrate;
        },
        (err) => console.log("Error: ", err)
      );
  }

  async save() {
    console.log("About to upsert Vital's data into DB");
    console.log("this.utilities.vitalPageState is below");
    console.log(this.utilities.vitalPageState);

    let vitalId = this.utilities.vitalPageState["vitalId"];
    let relativeId = this.utilities.selectedRelativeId;

    let temperature = this.utilities.vitalPageState["temperature"];
    let pulserate = this.utilities.vitalPageState["pulserate"];
    let respiratoryrate = this.utilities.vitalPageState["respiratoryrate"];
    let bpSystolic = this.utilities.vitalPageState["bp_systolic"];
    let bpDiastolic = this.utilities.vitalPageState["bp_diastolic"];

    const loading = await this.loadingController
      .create({
        message: "Saving...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService
            .upsertVitalDetails(
              vitalId,
              relativeId,
              temperature,
              pulserate,
              respiratoryrate,
              bpSystolic,
              bpDiastolic
            )
            .subscribe((data) => {
              console.log("Returned from Backend");
              console.log(JSON.stringify(data));
              if (this.utilities.isInvalidApiResponseData(data)) {
                this.utilities.presentToastWarning("Something went wrong.");
                a.dismiss();
                console.log("Returned Error");
                console.log(data);
                if (data["error"]) {
                  console.log("Something went wrong");
                }
              } else {
                console.log("Returned Success");

                let res = data[0];
                if (data[0]["query"]) {
                  let receivedQuery = res["query"];
                  console.log(receivedQuery);

                  this.db
                    .crudOperations(receivedQuery)
                    .then((res) => {
                      a.dismiss();
                      console.log("vitals is saved successfully");

                      if (this.currentQuestion == "four")
                        this.utilities.presentToastSuccess(
                          "Updated successfully."
                        );
                      this.router.navigate([this.forwardLink]);
                    })
                    .catch((error) => {
                      this.utilities.sqliteErrorDisplayer(
                        "vital-questions * save",
                        error
                      );
                      this.utilities.presentToastWarning(
                        "Something went wrong."
                      );
                      a.dismiss();
                      console.error(
                        "Error -> vital save function returned error." +
                          JSON.stringify(error)
                      );
                    });
                } else {
                  a.dismiss();
                  this.utilities.sqliteErrorDisplayer(
                    "vital-questions * save",
                    "Query property is not received from backend SP"
                  );
                  console.log("Query property is not received from backend SP");
                }
              }
            });
        });
      });

    // this.router.navigate(["/vitals"]);
  }
}
