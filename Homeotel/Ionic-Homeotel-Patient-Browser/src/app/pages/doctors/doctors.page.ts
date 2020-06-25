import { Component, OnInit } from "@angular/core";
import { CommonService } from "./../../services/common.service";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.page.html",
  styleUrls: ["./doctors.page.scss"],
})
export class DoctorsPage implements OnInit {
  doctors;
  faCommentDots = faCommentDots;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.doctors = this.commonService.doctors;
  }

  moreOptions() {
    console.log("More options clicked");
  }
}
