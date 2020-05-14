import { Component } from '@angular/core';
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-initialization",
  templateUrl: "./initialization.page.html",
  styleUrls: ["./initialization.page.scss"]
})
export class InitializationPage {

  constructor(
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.router.navigate(["/login"]);
  }

}
