import { Component, OnInit } from "@angular/core";
import { WheelSelector } from "@ionic-native/wheel-selector/ngx";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-edit-diagnosis",
  templateUrl: "./edit-diagnosis.page.html",
  styleUrls: ["./edit-diagnosis.page.scss"],
})
export class EditDiagnosisPage implements OnInit {
  backwardLink;
  forwardLink;
  currentTitle;
  currentSubTitle;
  columnValue;
  columnName;
  unSelectedList = [];
  filteredList = [];
  selectedList = [];
  diagnosisSelected = false;
  inputField: any;
  selectedYear;
  selectedMonth;
  selectedDate;
  years: any[];
  months: any[];
  dates: any[];
  date = new Date();
  currentYear = this.date.getFullYear();
  reviewYearValue: number = 0;
  reviewMonthValue: number = 0;
  reviewDateValue: number = 0;

  reviewDateOptions: any[] = [];
  reviewMonthOptions: any[] = [];
  reviewYearOptions: any[] = [];

  selectedReviewDate ;
  reviewDateFromDataBase;
  constructor(
    private selector: WheelSelector,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe((params) => {
      this.currentUrl(params["type"]);
    });
  }

  currentUrl(type) {
    switch (+type) {
      case 1:
        console.log(+type);
        this.loadMasters();
        this.backwardLink = `/diagnosis/${this.commonService.currentAppointmentId}`;
        this.currentTitle = "Diagnosis";
        this.forwardLink = "/edit-diagnosis/1/2";
        this.currentSubTitle = "Please select diagnosis";
        this.columnName = "diagnosis_id";
        this.updateData(this.columnName);
        break;

      case 2:
        console.log(+type);
        this.currentTitle = "Advice";
        this.currentSubTitle = "Please enter advice";
        this.backwardLink = "/edit-diagnosis/1";
        this.forwardLink = "/edit-diagnosis/1/2/3";
        this.columnName = "advice";
        this.updateData(this.columnName);

        break;

      case 3:
        console.log(+type);
        this.currentTitle = "Review Date";
        this.currentSubTitle = "Please enter review date";
        this.backwardLink = "/edit-diagnosis/1/2";
        this.forwardLink = `/diagnosis/${this.commonService.currentAppointmentId}`;
        this.columnName = "review_date";

        // Generating DOB date options
        for (let i = 1; i <= 30; i++) {
          this.reviewDateOptions.push({ description: i.toString() });
        }
        // Generating DOB month options
        for (let i = 1; i <= 11; i++) {
          this.reviewMonthOptions.push({ description: i.toString() });
        }
        // Generating DOB year options
        let j = 0;
        for (let i = this.currentYear; i >= this.currentYear - 100; i--) {
          this.reviewYearOptions.push({ description: i.toString(), id: j });
          j++;
        }

        var tempDate;
        tempDate = `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`;
        this.updateData(this.columnName);
        var date = this.reviewDateFromDataBase
          ? this.reviewDateFromDataBase
          : tempDate;
          console.log(this.selectedReviewDate);
          console.log(tempDate)
        let splitDateValue = date.split("-");
        let yearValue = +splitDateValue[0];
        let monthValue = +splitDateValue[1];
        let dateValue = +splitDateValue[2];

        this.reviewYearValue = this.reviewYearOptions.findIndex(
          (year) => year["description"] == yearValue
        );
        console.log("yearIndex -> " + this.reviewYearValue);

        this.reviewMonthValue = this.reviewMonthOptions.findIndex(
          (year) => year["description"] == monthValue
        );
        console.log("monthIndex -> " + this.reviewMonthValue);

        this.reviewDateValue = this.reviewDateOptions.findIndex(
          (year) => year["description"] == dateValue
        );
        console.log("dateIndex -> " + this.reviewDateValue);

        console.log("dobDateOptions are below");
        console.log(this.reviewDateOptions);
        console.log("reviewMonthOptions are below");
        console.log(this.reviewMonthOptions);
        console.log("reviewYearOptions are below");
        console.log(this.reviewYearOptions);

        this.selectedReviewDate = this.inputField =
          this.reviewYearValue +
          "-" +
          this.reviewMonthValue +
          "-" +
          this.reviewDateValue;

        


        console.log(
          this.reviewYearValue +
            " - " +
            this.reviewMonthValue +
            " - " +
            this.reviewDateValue
        );
        this.selectReviewDate();

        break;
    }
  }

  selectReviewDate() {
    this.selector
      .show({
        title: "Select Review Date (YYYY-MM-DD)",
        items: [
          this.reviewYearOptions,
          this.reviewMonthOptions,
          this.reviewDateOptions,
        ],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "light",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.reviewYearOptions[this.reviewYearValue].description,
          },
          {
            index: 1,
            value: this.reviewMonthOptions[this.reviewMonthValue].description,
          },
          {
            index: 2,
            value: this.reviewDateOptions[this.reviewDateValue].description,
          },
        ],
      })
      .then(
        (result) => {
          console.log("Selected Feet value is --> " + result[0].description);
          console.log("Selected Inches value is --> " + result[1].description);
          console.log("Selected Inches value is --> " + result[2].description);

          console.log(result[0].description + " at index: " + result[0].index);
          console.log(result[1].description + " at index: " + result[1].index);
          console.log(result[2].description + " at index: " + result[2].index);

          this.reviewYearValue = result[0].index;
          let y = result[0].description;

          this.reviewMonthValue = result[1].index;
          let m = result[1].description;

          this.reviewDateValue = result[2].index;
          let d = result[2].description;

          this.selectedReviewDate = y + "-" + m + "-" + d;
        },
        (err) => console.log("Error: ", err)
      );
  }

  loadMasters() {
    this.apiService.getMasters().subscribe((data) => {
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast("Something went wrong", "toastError");
      } else {
        console.log(data);
        this.unSelectedList = [];
        data[0].forEach((data) => {
          if (data.master_type == "diagnosis") {
            this.unSelectedList.push({
              id: data.id,
              name: data.name,
            });
          }
        });
        this.filteredList = this.unSelectedList;
      }
    });
  }

  onChange(searchedValue) {
    if (!searchedValue) {
      this.filteredList = this.unSelectedList;
    }
    this.filteredList = this.unSelectedList.filter((item) => {
      return item.name.toLowerCase().indexOf(searchedValue.toLowerCase()) > -1;
    });
  }

  select(id) {
    var index = this.unSelectedList.findIndex((data) => {
      return data.id === id;
    });
    this.selectedList = [];
    this.diagnosisSelected = true;
    this.selectedList = this.unSelectedList[index];
    this.columnValue = this.selectedList["id"];
    this.submit();
  }
  submit() {
    if (this.columnName == "advice") {
      this.columnValue = this.inputField;
    }

    if (this.columnName == "review_date") {
      this.columnValue = this.selectedReviewDate;
    }
    console.log(this.columnValue);
    this.apiService
      .saveDiagnosis(
        this.commonService.currentAppointmentId,
        this.commonService.currentDoctorId,
        this.commonService.currentUserId,
        this.commonService.currentRelativeId,
        this.columnName,
        this.columnValue
      )
      .subscribe((data) => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
        } else {
          this.router.navigate([this.forwardLink]);
        }
      });
  }

  updateData(id) {
    console.log(id);
    this.apiService
      .getAppointmentDetails(this.commonService.currentAppointmentId)
      .subscribe((data) => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data[1][0][id]);
          if (data[1].length > 0 && data[1][0][id]) {
            if (id == "diagnosis_id") {
              var databaseId = data[1][0][id];
              var index = this.unSelectedList.findIndex((data) => {
                return data.id === databaseId;
              });
              this.selectedList = [];
              this.diagnosisSelected = true;
              this.selectedList = this.unSelectedList[index];
              console.log(this.selectedList);
            } else if (id == "advice") {
              this.inputField = data[1][0][id];
            } else if (id == "review_date") {
              this.reviewDateFromDataBase = data[1][0][id];
            }
          }
        }
      });
  }

  setDates(date) {
    if (date) {
      this.selectedYear = date.split("-")[0];
      this.selectedMonth = date.split("-")[1];
      this.selectedDate = date.split("-")[2];
      console.log(typeof this.selectedYear);
      console.log(this.selectedMonth);
      console.log(this.selectedDate);
    }
  }
}
