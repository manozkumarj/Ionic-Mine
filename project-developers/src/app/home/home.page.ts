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
    let allDevelopers = this.api.getAllDevelopers();
    this.developersCount = allDevelopers.length;
    // console.log(this.developersCount);
  }
}
