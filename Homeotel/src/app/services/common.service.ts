import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CommonService {

  doctors;
  familyMembers;

  constructor(
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.doctors = [
      {
        id: 1,
        name: 'Uday Kumar',
        img: "assets/images/bill.jpg"
      },
      {
        id: 2,
        name: 'Bharat Raj',
        img: "assets/images/larry.jpg"
      },
      {
        id: 3,
        name: 'Manoj Kumar',
        img: "assets/images/zuck.jpg"
      },
      {
        id: 4,
        name: 'Mallesh',
        img: "assets/images/mark.jpg"
      },
      {
        id: 5,
        name: 'Rohit Kumar',
        img: "assets/images/sergey.jpg"
      },
      {
        id: 6,
        name: 'Maruthi',
        img: "assets/images/warren.jpg"
      }
    ];

    this.familyMembers = [
      {
        id: 1,
        name: 'Uday Kumar',
        img: "assets/images/bill.jpg",
        relation: "Mother"
      },
      {
        id: 2,
        name: 'Bharat Raj',
        img: "assets/images/larry.jpg",
        relation: "Father"
      },
      {
        id: 3,
        name: 'Manoj Kumar',
        img: "assets/images/zuck.jpg",
        relation: "Son"
      },
      {
        id: 4,
        name: 'Mallesh',
        img: "assets/images/mark.jpg",
        relation: "Daughter"
      },
      {
        id: 5,
        name: 'Rohit Kumar',
        img: "assets/images/sergey.jpg",
        relation: "Grand-son"
      },
      {
        id: 6,
        name: 'Maruthi',
        img: "assets/images/warren.jpg",
        relation: "Grand-daughter"
      }
    ];

  }

  logout() {
    this.alertCtrl
      .create({
        header: "Are you sure?",
        message: "Do you want to logout?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Logout",
            handler: () => {
              // alert("User will be logged out");
              this.router.navigate(["/login"]);
              // this.storageService.clear();
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
