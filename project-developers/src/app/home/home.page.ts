import { Component, OnInit } from "@angular/core";
import { ApiService } from "./../services/api.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  developersCount;
  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.developersCount = this.api.totalDevelopers;
    console.log(this.developersCount);
  }
}
