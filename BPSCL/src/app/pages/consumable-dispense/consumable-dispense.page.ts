import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-consumable-dispense",
  templateUrl: "./consumable-dispense.page.html",
  styleUrls: ["./consumable-dispense.page.scss"]
})
export class ConsumableDispensePage implements OnInit {
  showDispenses: boolean = false;

  consumableDispenses: any[] = [
    {
      itemId: 1,
      genericName: "Bandage 6 inch",
      allowQuantity: false
    },
    {
      itemId: 2,
      genericName: "Cotton Role 450grm",
      allowQuantity: false
    },
    {
      itemId: 3,
      genericName: "Face mask",
      allowQuantity: false
    }
  ];

  constructor() {}

  ngOnInit() {}

  remarksCheckbox(e) {
    if (e.target.checked) {
      this.showDispenses = true;
      // this.doctorForm.patchValue({ cd: "N/A", ncd: "N/A", minorAilments: "N/A", refferedTo: -1 });
      console.log("remarksCheckbox is checked");
    } else {
      this.showDispenses = false;
      // this.doctorForm.patchValue({ cd: "", ncd: "", minorAilments: "", refferedTo: "" });
      console.log("remarksCheckbox is unchecked");
    }
  }

  dispenseCheckbox(id, e) {
    if (e.target.checked) {
      this.consumableDispenses[id - 1]["allowQuantity"] = true;
      console.log(id + " -> dispenseCheckbox is checked");
    } else {
      this.consumableDispenses[id - 1]["allowQuantity"] = false;
      console.log(id + " -> dispenseCheckbox is unchecked");
    }
  }
}
