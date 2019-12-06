import { Component, OnInit } from "@angular/core";
import { ApiService } from "./../../services/api.service";

@Component({
  selector: "app-all-developers",
  templateUrl: "./all-developers.page.html",
  styleUrls: ["./all-developers.page.scss"]
})
export class AllDevelopersPage implements OnInit {
  allDevelopers;
  constructor(public api: ApiService) {}

  ngOnInit() {
    this.allDevelopers = this.api.getAllDevelopers();
  }
}
