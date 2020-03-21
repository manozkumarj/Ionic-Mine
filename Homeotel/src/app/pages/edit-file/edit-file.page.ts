import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-edit-file",
  templateUrl: "./edit-file.page.html",
  styleUrls: ["./edit-file.page.scss"]
})
export class EditFilePage implements OnInit {
  selectedPerson;

  constructor() {}

  ngOnInit() {}

  person(id) {
    console.log("Selected person ID -> " + id);
    this.selectedPerson = id;
  }
}
