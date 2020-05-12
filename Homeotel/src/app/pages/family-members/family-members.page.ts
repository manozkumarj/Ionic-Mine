import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-family-members",
  templateUrl: "./family-members.page.html",
  styleUrls: ["./family-members.page.scss"],
})
export class FamilyMembersPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  search() {
    console.log("search func triggered");
  }
}
