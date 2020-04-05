import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.page.html",
  styleUrls: ["./appointments.page.scss"],
})
export class AppointmentsPage implements OnInit {
  selectedTab = 1;

  constructor() {}

  ngOnInit() {}

  togglingTabs(tab) {
    this.selectedTab = tab;
  }
}
