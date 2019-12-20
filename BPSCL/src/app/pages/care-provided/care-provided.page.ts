import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: "app-care-provided",
  templateUrl: "./care-provided.page.html",
  styleUrls: ["./care-provided.page.scss"]
})
export class CareProvidedPage implements OnInit {
  sqliteTables: any[] = [];
  constructor(
    public loadingController: LoadingController,
    private db: DatabaseService
  ) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Please wait...",
      duration: 5000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log("Loading dismissed!");
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: "Please wait...",
      translucent: true,
      cssClass: "custom-class custom-loading"
    });
    return await loading.present();
  }

  ngOnInit() {
    this.presentLoading();
    this.db.getTables().then(tables => {
      this.sqliteTables = tables;
      // alert("Total No. of tables ==> " + tables.length);
      // alert("Table names are ==> " + JSON.stringify(tables));
    }).catch(error => {
      // this.presentToastWarning();
      console.error("Database Error " + JSON.stringify(error));
    });
  }
}
