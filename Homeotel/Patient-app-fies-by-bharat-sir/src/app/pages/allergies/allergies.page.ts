import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-allergies",
  templateUrl: "./allergies.page.html",
  styleUrls: ["./allergies.page.scss"],
})
export class AllergiesPage implements OnInit {
  arrayOfObjects;
  selectedObjects;
  clonedArrayOfObjects;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.clonedArrayOfObjects = this.arrayOfObjects = [
      {
        id: 0,
        name: "John",
        isSelected: false,
      },
      {
        id: 1,
        name: "Honey",
        isSelected: false,
      },
      {
        id: 2,
        name: "Donald Trump",
        isSelected: false,
      },
      {
        id: 3,
        name: "Nair",
        isSelected: false,
      },
      {
        id: 4,
        name: "Evan",
        isSelected: false,
      },
      {
        id: 5,
        name: "Valen",
        isSelected: false,
      },
      {
        id: 6,
        name: "Iffy",
        isSelected: false,
      },
    ];

    this.selectedObjects = [];
  }

  onChange(word) {
    console.log("Searched word -> " + word);
    this.clonedArrayOfObjects = this.arrayOfObjects.filter((q) => {
      const regex = new RegExp(`${word}`, "gi");
      return !q.isSelected && q.name.match(regex);
    });
    console.log(JSON.stringify(this.arrayOfObjects));
  }

  chooser(id) {
    console.log("Item will be chosen " + id);
    this.arrayOfObjects[id]["isSelected"] = true;
    this.selectedObjects.push(id);
  }

  remover(id) {
    console.log("Item will be removed " + id);
    this.arrayOfObjects[id]["isSelected"] = false;
    this.selectedObjects = this.selectedObjects.filter(
      (option) => option != id
    );

    // this.alertCtrl
    //   .create({
    //     header: "Are you sure?",
    //     message: "Do you want to remove?",
    //     buttons: [
    //       {
    //         text: "Cancel",
    //         role: "cancel"
    //       },
    //       {
    //         text: "Remove",
    //         handler: () => {
    //           console.log("Item will be removed " + id);
    //           this.arrayOfObjects[id]["isSelected"] = false;
    //           this.selectedObjects = this.selectedObjects.filter(
    //             option => option != id
    //           );
    //         }
    //       }
    //     ]
    //   })
    //   .then(alertEl => {
    //     alertEl.present();
    //   });
  }
}
