import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "./../../services/database.service";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-initialization',
  templateUrl: './initialization.page.html',
  styleUrls: ['./initialization.page.scss'],
})
export class InitializationPage implements OnInit {

  constructor(
    private db: DatabaseService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    if (!this.db.isDbReady) {
      console.log("Database is not ready... Initializing DB...");
      this.presentLoading();
    } else {
      console.log("Database is ready... :)");
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

}
