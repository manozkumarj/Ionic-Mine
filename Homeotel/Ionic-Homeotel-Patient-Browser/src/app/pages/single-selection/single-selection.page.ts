import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-single-selection",
  templateUrl: "./single-selection.page.html",
  styleUrls: ["./single-selection.page.scss"],
})
export class SingleSelectionPage implements OnInit {
  title;
  options;
  clonedOptions;

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private router: Router
  ) {
    console.log("this.utilities.lifestylePageState-selectedLifestyle is below");
    console.log(this.utilities.lifestylePageState["selectedLifestyle"]);

    this.title = this.utilities.lifestylePageState["selectedLifestyle"]["name"];

    let master = this.utilities.lifestylePageState["selectedLifestyle"][
      "masterDataTag"
    ];
    let currentMasters = this.utilities.lifestylePageState[master];
    console.log("Current master data is below");
    console.log(currentMasters);
  }

  ngOnInit() {
    this.clonedOptions = this.options = [
      {
        id: 0,
        name: "John",
      },
      {
        id: 1,
        name: "Honey",
      },
      {
        id: 2,
        name: "Donald Trump",
      },
      {
        id: 3,
        name: "Nair",
      },
      {
        id: 4,
        name: "Evan",
      },
      {
        id: 5,
        name: "Valen",
      },
      {
        id: 6,
        name: "Iffy",
      },
    ];
  }

  onChange(word) {
    console.log("Searched word -> " + word);
    this.clonedOptions = this.options.filter((q) => {
      const regex = new RegExp(`${word}`, "gi");
      return q.name.match(regex);
    });
    console.log(JSON.stringify(this.clonedOptions));
  }

  chooser(id) {
    console.log("Item will be chosen " + id);
    this.router.navigate(["/medical-history"]);
  }
}
