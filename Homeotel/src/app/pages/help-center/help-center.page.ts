import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-help-center",
  templateUrl: "./help-center.page.html",
  styleUrls: ["./help-center.page.scss"],
})
export class HelpCenterPage implements OnInit {
  issues: any[] = [];

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService
  ) {
    this.getIssues();
  }

  ngOnInit() {}

  getIssues() {
    this.apiService.getIssues().subscribe((data) => {
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
          this.issues = data[0];
          console.log("this.issues are showing below");
          console.log(this.issues);
        } else {
          console.log("Something went wrong in backend");
        }
      }
    });
  }
}
