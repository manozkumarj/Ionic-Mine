import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "./../../services/database.service";
import { LoadingController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-initialization',
  templateUrl: './initialization.page.html',
  styleUrls: ['./initialization.page.scss'],
})
export class InitializationPage implements OnInit {

  constructor(
    private db: DatabaseService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    if (!this.db.isDbReady) {
      console.log("Database is not ready... Initializing DB...");
      // this.presentLoading();
      this.prepareDatabase();
    } else {
      console.log("Database is ready... :)");
      this.router.navigate(["/home"]);
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait, <br/>Database is Initializing...',
      translucent: true
    });
    await loading.present();
  }


  async prepareDatabase() {
    console.log("prepareDatabase func is started...");

    const loading = await this.loadingController.create({
      message: 'Please wait, <br/>Database is Initializing...',
      translucent: true
    }).then(a => {
      a.present().then(async (res) => {
        console.log('presented');
        let data = await this.db
          .checkTable()
          .then(async (res: any) => {
            let data = await res;
            if (!data) {
              console.error(
                "checkTable() -> Something went wrong -> " + JSON.stringify(res)
              );
            } else {
              console.log("Table is ready :) -> " + JSON.stringify(res));
            }
            return data;
          })
          .catch((error: any) => {
            console.error(
              "catch -> Table doesn't exist -> " + JSON.stringify(error)
            );
            return false;
          });

        console.log("After execution prepareDatabase() result is -> " + data);
        if (data) {
          a.dismiss();
          this.router.navigate(["/home"]);
        }

      });
    });

  }

}
