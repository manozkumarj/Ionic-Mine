import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { CommonService } from "./../../services/common.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.page.html",
  styleUrls: ["./reports.page.scss"]
})
export class ReportsPage implements OnInit {
  reportsForm: FormGroup;
  reports: any[] = [];

  drugwiseDataHeadings: any[] = [
    "DrugId",
    "DrugName",
    "ItemTypeName",
    "Total_Quantity",
    "ServicePoint"
  ];

  benwiseDrugReportDataHeadings: any[] = [
    "PatientId",
    "VisitId",
    "ItemId",
    "DrugName",
    "QuantityGiven",
    "ServicePointName",
    "InsertedDate"
  ];

  benSummaryReportDataHeadings: any[] = [
    "PatientId",
    "VisitId",
    "ItemId",
    "DrugName",
    "QuantityGiven",
    "ServicePointName",
    "RegistrationDate",
    "VisitDate",
    "Name",
    "Surname",
    "GenderType",
    "Age",
    "Height",
    "Weight",
    "BMI",
    "RespiratoryRate"
  ];

  benVisitReportDataHeadings: any[] = [
    "VisitId",
    "PatientId",
    "ServicePointName",
    "RegistrationDate",
    "VisitDate",
    "Name",
    "Surname",
    "Gender",
    "Age",
    "Type"
  ];

  regAndRevisitDataHeadings: any[] = ["Count", "Count No"];

  uploadedCountDataHeadings: any[] = ["TableName", "Uploads Type", "Count(*)"];

  headings: any[] = [];

  drugwiseReports: any[] = [];
  beneficiarywiseDrugReports: any[] = [];
  benSummaryReports: any[] = [];
  benVisitReports: any[] = [];
  regAndRevisitCountReports: any[] = [];
  checkUploadedCountReports: any[] = [];

  servicePointName: string;
  servicePointId: string;
  isLoadingOrNoDataFound: boolean = true;
  loadingOrNoDataFound: string = 'No Data Found';

  newDate = new Date();
  dateTime: string = this.commonService.getDateTime(this.newDate);

  constructor(
    private db: DatabaseService,
    private router: Router,
    private commonService: CommonService,
    private storageService: StorageService
  ) {
    this.reportsForm = new FormGroup({
      report: new FormControl("", Validators.required),
      fromDate: new FormControl("", Validators.required),
      toDate: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.loadReports();
    this.loadSessionDetails();
  }

  loadReports() {
    this.db
      .getReports()
      .then(reports => {
        // console.log("Fetched reports -> " + JSON.stringify(reports));
        this.reports = reports;
      })
      .catch(error => {
        console.error(
          "Error -> getReports() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadSessionDetails() {
    this.storageService
      .getObject("sessionDetails")
      .then(data => {
        // console.log("Session Details are -> " + JSON.stringify(data));

        this.servicePointName = data["servicePointName"];
        this.servicePointId = data["servicePointId"];
      })
      .catch(error => {
        console.error(
          "Session Details were not set -> " + JSON.stringify(error)
        );
      });
  }

  onSubmit(values, csv = false) {
    console.clear();
    console.log("Reports form is submitted, below are the values");
    console.log(values);
    console.log("Is CSV export -> " + csv);

    this.isLoadingOrNoDataFound = true;
    this.loadingOrNoDataFound = 'Loading...';

    this.drugwiseReports.length = 0;
    this.beneficiarywiseDrugReports.length = 0;
    this.benSummaryReports.length = 0;
    this.benVisitReports.length = 0;
    this.regAndRevisitCountReports.length = 0;
    this.checkUploadedCountReports.length = 0;

    let report = this.reportsForm.get("report").value;
    let fromDate = this.reportsForm.get("fromDate").value.trim();
    let toDate = this.reportsForm.get("toDate").value.trim();

    if (!report || report <= 0) {
      alert("Please Select Report");
      return false;
    }
    if (!fromDate || fromDate == null) {
      alert("Please Select Start Date");
      return false;
    }
    if (!toDate || toDate == null) {
      alert("Please Select To Date");
      return false;
    }

    let startDate =
      this.commonService.getDateTime(new Date(fromDate)) + " 00:00:00";
    console.log("startDate after converting --> " + startDate);

    let endDate =
      this.commonService.getDateTime(new Date(toDate)) + " 23:59:59";
    console.log("startDate after converting --> " + endDate);

    if (report == 1) {
      this.headings = this.drugwiseDataHeadings;
      this.db
        .drugwiseReports(startDate, endDate)
        .then(data => {
          if (data.length > 0) {
            this.drugwiseReports = data;
            this.isLoadingOrNoDataFound = false;
            console.log("Fetched drugwiseReports " + JSON.stringify(data));
          } else {
            this.loadingOrNoDataFound = 'No Data Found';
            console.log("No drugwiseReports found");
          }
        })
        .catch(e => {
          this.loadingOrNoDataFound = 'No Data Found';
          console.error(
            "Error -> drugwiseReports returned error" + JSON.stringify(e)
          );
        });
    } else if (report == 2) {
      this.headings = this.benwiseDrugReportDataHeadings;
      this.db
        .beneficiarywiseDrugReports(startDate, endDate)
        .then(data => {
          if (data.length > 0) {
            this.beneficiarywiseDrugReports = data;
            this.isLoadingOrNoDataFound = false;
            console.log(
              "Fetched beneficiarywiseDrugReports " + JSON.stringify(data)
            );
          } else {
            this.loadingOrNoDataFound = 'No Data Found';
            console.log("No beneficiarywiseDrugReports found");
          }
        })
        .catch(e => {
          this.loadingOrNoDataFound = 'No Data Found';
          console.error(
            "Error -> beneficiarywiseDrugReports returned error" +
            JSON.stringify(e)
          );
        });
    } else if (report == 3) {
      this.headings = this.benSummaryReportDataHeadings;
      this.db
        .benSummaryReports(startDate, endDate)
        .then(data => {
          if (data.length > 0) {
            this.benSummaryReports = data;
            this.isLoadingOrNoDataFound = false;
            console.log("Fetched benSummaryReports " + JSON.stringify(data));
          } else {
            this.loadingOrNoDataFound = 'No Data Found';
            console.log("No benSummaryReports found");
          }
        })
        .catch(e => {
          this.loadingOrNoDataFound = 'No Data Found';
          console.error(
            "Error -> benSummaryReports returned error" + JSON.stringify(e)
          );
        });
    } else if (report == 4) {
      this.headings = this.benVisitReportDataHeadings;
      this.db
        .benVisitReports(startDate, endDate)
        .then(data => {
          if (data.length > 0) {
            this.benVisitReports = data;
            this.isLoadingOrNoDataFound = false;
            console.log("Fetched benVisitReports " + JSON.stringify(data));
          } else {
            this.loadingOrNoDataFound = 'No Data Found';
            console.log("No benVisitReports found");
          }
        })
        .catch(e => {
          this.loadingOrNoDataFound = 'No Data Found';
          console.error(
            "Error -> benVisitReports returned error" + JSON.stringify(e)
          );
        });
    } else if (report == 5) {
      this.headings = this.regAndRevisitDataHeadings;
      this.db
        .regAndRevisitCountReports(startDate, endDate)
        .then(data => {
          if (data.length > 0) {
            this.regAndRevisitCountReports = data;
            this.isLoadingOrNoDataFound = false;
            console.log(
              "Fetched regAndRevisitCountReports " + JSON.stringify(data)
            );
          } else {
            this.loadingOrNoDataFound = 'No Data Found';
            console.log("No regAndRevisitCountReports found");
          }
        })
        .catch(e => {
          this.loadingOrNoDataFound = 'No Data Found';
          console.error(
            "Error -> regAndRevisitCountReports returned error" +
            JSON.stringify(e)
          );
        });
    } else if (report == 6) {
      this.headings = this.uploadedCountDataHeadings;
      this.db
        .checkUploadedCountReports(startDate, endDate)
        .then(data => {
          if (data.length > 0) {
            this.checkUploadedCountReports = data;
            this.isLoadingOrNoDataFound = false;
            console.log(
              "Fetched checkUploadedCountReports " + JSON.stringify(data)
            );
          } else {
            this.loadingOrNoDataFound = 'No Data Found';
            console.log("No checkUploadedCountReports found");
          }
        })
        .catch(e => {
          this.loadingOrNoDataFound = 'No Data Found';
          console.error(
            "Error -> checkUploadedCountReports returned error" +
            JSON.stringify(e)
          );
        });
    }

    // if (csv) {
    //   alert("Export CSV file");
    // } else {
    //   alert("Show details");
    // }
  }
}
