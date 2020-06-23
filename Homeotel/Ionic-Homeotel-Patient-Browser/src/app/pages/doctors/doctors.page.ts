import { Component, OnInit } from "@angular/core";
import { CommonService } from "./../../services/common.service";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.page.html",
  styleUrls: ["./doctors.page.scss"],
})
export class DoctorsPage implements OnInit {
  doctors;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.doctors = this.commonService.doctors;
  }

  moreOptions() {
    console.log("More options clicked");
  }
}
