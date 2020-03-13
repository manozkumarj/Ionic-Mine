import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-my-doctors',
  templateUrl: './my-doctors.page.html',
  styleUrls: ['./my-doctors.page.scss'],
})
export class MyDoctorsPage implements OnInit {

  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  inputKeyUp(e) {
    var target = e.srcElement;
    var maxLength = parseInt(target.attributes["maxlength"].value, 5);
    var myLength = target.value.length;
    if (myLength >= maxLength) {
      var next = target;
      while (next = next.nextElementSibling) {
        if (next == null) {
          this.showloginmodal();
          break;
        }
        if (next.tagName.toLowerCase() == "input") {
          next.focus();
          break;
        }
      }
    }
    this.showloginmodal();
  }

  showloginmodal() {
    console.log("showloginmodal is triggered");
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      showBackdrop: true,
      cssClass: "signInModal",
      componentProps: {
        'cssClass': 'signInModal'
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
