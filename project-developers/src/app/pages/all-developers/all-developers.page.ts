import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { ApiService } from "./../../services/api.service";
import { DatabaseService } from "./../../services/database.service";

@Component({
  selector: "app-all-developers",
  templateUrl: "./all-developers.page.html",
  styleUrls: ["./all-developers.page.scss"]
})
export class AllDevelopersPage implements OnInit {
  allDevelopers;
  isDone = false;
  developersCount;
  constructor(public api: ApiService, private toastController: ToastController, public activatedRoute: ActivatedRoute, private db: DatabaseService) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get("done")) {
      this.isDone = true;
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.presentToastSuccess();
      event.target.complete();
    }, 2000);
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

    // this.allDevelopers = this.api.getAllDevelopers();
    // this.developersCount = this.allDevelopers.length;
    // // console.log(this.developersCount);
    // if (this.isDone) {
    //   this.presentToastSuccess();
    // }

    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getDevs().subscribe(devs => {
          this.allDevelopers = devs;
          this.developersCount = this.allDevelopers.length;
        });

        console.log("Listing the Developers");
      } else {
        this.presentToastWarning();
        console.log("Database is not yet ready, need to create");
      }
    });

  }
}
