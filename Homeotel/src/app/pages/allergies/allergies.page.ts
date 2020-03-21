import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-allergies",
  templateUrl: "./allergies.page.html",
  styleUrls: ["./allergies.page.scss"]
})
export class AllergiesPage implements OnInit {
  firstQuestionList;
  firstSelectedOptions;
  clonedFirstQuestionList;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.clonedFirstQuestionList = this.firstQuestionList = [
      {
        id: 0,
        name: "John",
        isSelected: false
      },
      {
        id: 1,
        name: "Honey",
        isSelected: false
      },
      {
        id: 2,
        name: "Donald Trump",
        isSelected: false
      },
      {
        id: 3,
        name: "Nair",
        isSelected: false
      },
      {
        id: 4,
        name: "Evan",
        isSelected: false
      },
      {
        id: 5,
        name: "Valen",
        isSelected: false
      },
      {
        id: 6,
        name: "Iffy",
        isSelected: false
      }
    ];

    this.firstSelectedOptions = [];
  }

  onChange(word) {
    console.log("Searched word -> " + word);
    this.clonedFirstQuestionList = this.firstQuestionList.filter(q => {
      const regex = new RegExp(`${word}`, "gi");
      return !q.isSelected && q.name.match(regex);
    });
    console.log(JSON.stringify(this.firstQuestionList));
  }

  chooser(id) {
    console.log("Item will be chosen " + id);
    this.firstQuestionList[id]["isSelected"] = true;
    this.firstSelectedOptions.push(id);
  }

  remover(id) {
    console.log("Item will be removed " + id);
    this.firstQuestionList[id]["isSelected"] = false;
    this.firstSelectedOptions = this.firstSelectedOptions.filter(
      option => option != id
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
    //           this.firstQuestionList[id]["isSelected"] = false;
    //           this.firstSelectedOptions = this.firstSelectedOptions.filter(
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
