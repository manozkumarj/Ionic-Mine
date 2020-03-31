import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { ApiService } from "./../../services/api.service";
import { CommonService } from "./../../services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-my-doctors",
  templateUrl: "./my-doctors.page.html",
  styleUrls: ["./my-doctors.page.scss"]
})
export class MyDoctorsPage implements OnInit {
  myDoctors: any[] = [];
  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public commonService: CommonService,
    private apiService: ApiService,
    private utilities: UtilitiesService
  ) {
    this.getCurrentUserDoctors();
  }

  ngOnInit() {}

  getCurrentUserDoctors() {
    this.apiService.getCurrentUserDoctors().subscribe(data => {
      console.log("Returned from Backend");
      console.log(JSON.stringify(data[0]));
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (
          typeof data != "undefined" &&
          typeof data[0] != "undefined" &&
          typeof data[0][0] != "undefined"
        ) {
          console.log("Has my doctors");
          this.myDoctors = data[0];
        } else {
          console.log("No my doctors");
        }
      }
    });
  }

  inputKeyUp(e) {
    var target = e.srcElement;
    var maxLength = parseInt(target.attributes["maxlength"].value);
    var myLength = target.value.length;
    if (myLength >= maxLength) {
      var next = target;
      while ((next = next.nextElementSibling)) {
        if (next == null) {
          this.showloginmodal();
        }
        if (next.tagName.toLowerCase() == "input") {
          next.focus();
          break;
        }
      }
    }
  }

  lastInputKeyUp(e) {
    this.showloginmodal();
  }

  showloginmodal() {
    console.log("showloginmodal is triggered");
    this.presentFindDoctorModal();
  }

  async presentFindDoctorModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      showBackdrop: true,
      cssClass: "findDoctorModal",
      componentProps: {
        action: "findDoctor"
      }
    });
    return await modal.present();
  }

  async presentDoctorContactModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      showBackdrop: true,
      cssClass: "findDoctorModal",
      componentProps: {
        action: "contactDoctor"
      }
    });
    return await modal.present();
  }

  // showPromptAlert() {
  //   let alert = this.alertCtrl
  //     .create({
  //       header: 'Login',
  //       inputs: [
  //         {
  //           name: 'username',
  //           placeholder: 'Enter Username'
  //         },
  //         {
  //           name: 'password',
  //           placeholder: 'Enter Password',
  //           type: 'password'
  //         }
  //       ],
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           role: 'cancel',
  //           handler: data => {
  //             console.log('You Clicked on Cancel');
  //           }
  //         },
  //         {
  //           text: 'Login',
  //           handler: data => {
  //             if (data.username, data.password) {
  //               console.log('Form is valid');
  //               console.log(`
  //               username -> ${data.username}
  //               password -> ${data.password}
  //               `);
  //             } else {
  //               console.log('Form is invalid');
  //               return false;
  //             }
  //           }
  //         }
  //       ]
  //     }).then(alert1 => alert1.present());
  // }
}
