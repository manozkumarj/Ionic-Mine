import { Component, OnInit } from "@angular/core";
import { ApiService } from "./../services/api.service";
import { DatabaseService } from '../services/database.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  developersCount;
  constructor(public api: ApiService, private toastController: ToastController, private db: DatabaseService) { }

  ngOnInit() {
  }


  async presentToastSuccess() {
    const toast = await this.toastController.create({
      color: 'success',
      message: 'Success.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastWarning() {
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'Something went wrong.',
      duration: 2000
    });
    toast.present();
  }

  ionViewWillEnter() {
    // let allDevelopers = this.api.getAllDevelopers();
    // this.developersCount = allDevelopers.length;
    // console.log(this.developersCount);


    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getDevs().subscribe(devs => {
          let allDevelopers = devs;
          this.developersCount = allDevelopers.length;
        });
        // this.presentToastSuccess();

        console.log("Listing the Developers");
      } else {
        this.presentToastWarning();
        console.log("Database is not yet ready, need to create");
      }
    });

  }
}
