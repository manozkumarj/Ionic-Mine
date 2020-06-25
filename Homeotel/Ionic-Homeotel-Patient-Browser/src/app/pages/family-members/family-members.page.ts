import { Component, OnInit } from "@angular/core";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-family-members",
  templateUrl: "./family-members.page.html",
  styleUrls: ["./family-members.page.scss"],
})
export class FamilyMembersPage implements OnInit {
  faCircle = faCircle;
  constructor() {}

  ngOnInit() {}

  search() {
    console.log("search func triggered");
  }
}
