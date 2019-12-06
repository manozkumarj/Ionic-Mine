import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from '@ionic/angular';

import { ApiService } from "./../../services/api.service";

@Component({
  selector: "app-view-developer",
  templateUrl: "./view-developer.page.html",
  styleUrls: ["./view-developer.page.scss"]
})
export class ViewDeveloperPage implements OnInit {
  developer;
  thumbnail = "https://picsum.photos/200";
  constructor(public api: ApiService, public activatedRoute: ActivatedRoute, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.developer = this.api.getDeveloper(id);
  }

  deleteDeveloper() {
    // alert(this.developer.id);
    let currentDeveloperId = this.developer.id;
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you want to delete this developer?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.api.deleteDeveloper(currentDeveloperId);
            this.router.navigate(['./all-developers/done']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
