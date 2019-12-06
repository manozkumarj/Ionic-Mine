import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { ApiService } from "./../../services/api.service";

@Component({
  selector: "app-all-developers",
  templateUrl: "./all-developers.page.html",
  styleUrls: ["./all-developers.page.scss"]
})
export class AllDevelopersPage implements OnInit {
  allDevelopers;
  isDone = false;
  developersCount;
  constructor(public api: ApiService, private toastController: ToastController, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get("done")) {
      this.isDone = true;
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      color: 'primary',
      message: 'Saved successfully.',
      duration: 2000
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.allDevelopers = this.api.getAllDevelopers();
    this.developersCount = this.allDevelopers.length;
    // console.log(this.developersCount);
    if (this.isDone) {
      this.presentToast();
    }
  }
}
