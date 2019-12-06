import { Component, OnInit } from "@angular/core";
import { ApiService } from "./../../services/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-developer",
  templateUrl: "./view-developer.page.html",
  styleUrls: ["./view-developer.page.scss"]
})
export class ViewDeveloperPage implements OnInit {
  developer;
  thumbnail = "https://picsum.photos/200";
  constructor(public api: ApiService, public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.developer = this.api.getDeveloper(id);
  }
}
