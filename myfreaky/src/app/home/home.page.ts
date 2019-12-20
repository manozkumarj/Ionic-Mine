import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { DatabaseService } from './../services/database.service';
import { AlertController } from "@ionic/angular";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {

  backButtonSubscription; // for storing the returned subscription
  namesList = [];
  name_model: string = ""; // Input field model

  constructor(
    private platform: Platform,
    private toastController: ToastController,
    private db: DatabaseService,
    private alertCtrl: AlertController
  ) {
    this.getNames();
  }

  ngOnInit() { }

  doRefresh(event) {
    console.log("Begin async operation");
    setTimeout(() => {
      console.log("Async operation has ended");
      this.presentToastSuccess();
      event.target.complete();
    }, 2000);
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      color: "success",
      message: "Success.",
      duration: 2000
    });
    toast.present();
  }

  async presentToastWarning() {
    const toast = await this.toastController.create({
      color: "danger",
      message: "Something went wrong.",
      duration: 2000
    });
    toast.present();
  }

  insertName() {
    if (!this.name_model.length) {
      alert("Enter Name");
      return;
    }
    this.db.insertItem(this.name_model).then(res => {
      this.name_model = '';
      this.getNames();
      console.log("Home - insertName - Success -> " + JSON.stringify(res));
    }).catch(error => {
      console.log("Home - insertName - error -> " + JSON.stringify(error));
    });
  }

  getNames() {
    this.db.getItems().then(names => {
      this.namesList = names;
      this.presentToastSuccess();
      console.log("Home - getNames - Success -> " + JSON.stringify(names));
    }).catch(error => {
      console.log("Home - getNames - error -> " + JSON.stringify(error));
    });
  }

  deleteName(name) {
    console.log("Delatable name -> " + name);
    if (!name) {
      alert("Enter Name");
      return;
    }
    this.alertCtrl
      .create({
        header: "Are you sure?",
        message: "Do you want to delete this Name?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Delete",
            handler: () => {
              this.db.deleteItem(name).then(res => {
                this.name_model = '';
                this.getNames();
                console.log("Home - insertName - Success -> " + JSON.stringify(res));
              }).catch(error => {
                console.log("Home - insertName - error -> " + JSON.stringify(error));
              });
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

}
