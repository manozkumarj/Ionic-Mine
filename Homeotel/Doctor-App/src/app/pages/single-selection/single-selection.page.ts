import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-single-selection",
  templateUrl: "./single-selection.page.html",
  styleUrls: ["./single-selection.page.scss"]
})
export class SingleSelectionPage implements OnInit {
  options;
  clonedOptions;

  constructor(private router: Router) {}

  ngOnInit() {
    this.clonedOptions = this.options = [
      {
        id: 0,
        name: "John"
      },
      {
        id: 1,
        name: "Honey"
      },
      {
        id: 2,
        name: "Donald Trump"
      },
      {
        id: 3,
        name: "Nair"
      },
      {
        id: 4,
        name: "Evan"
      },
      {
        id: 5,
        name: "Valen"
      },
      {
        id: 6,
        name: "Iffy"
      }
    ];
  }

  onChange(word) {
    console.log("Searched word -> " + word);
    this.clonedOptions = this.options.filter(q => {
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
