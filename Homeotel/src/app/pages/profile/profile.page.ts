import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  selectedGender = null;

  constructor(
    private apiService: ApiService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
    this.getProfileDetails();
  }

  moreOptions() {
    console.log("Clicked on moreOptions()");
  }

  getProfileDetails() {
    this.apiService.getProfileDetails().subscribe((data) => {
      console.log("Returned from Backend");
      console.log(JSON.stringify(data));
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (
          typeof data != "undefined" &&
          typeof data[0] != "undefined" &&
          typeof data[0][0] != "undefined"
        ) {
          console.log("Has profile details");
          this.utilities.profilePageDetails = data[0][0];
          console.log(this.utilities.profilePageDetails["email"]);
        } else {
          console.log("No user found with provided user ID");
        }
      }
    });
  }
}
