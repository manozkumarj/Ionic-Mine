import { DatabaseService, Dev } from "./../../services/database.service";
import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Observable } from "rxjs";

@Component({
  selector: "app-developers",
  templateUrl: "./developers.page.html",
  styleUrls: ["./developers.page.scss"]
})
export class DevelopersPage implements OnInit {
  developers: Dev[] = [];

  products: Observable<any[]>;

  developer = {};
  product = {};

  capturedSnapURL: string;

  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  selectedView = "devs";

  constructor(
    private db: DatabaseService,
    private camera: Camera,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
        });
        this.products = this.db.getProducts();
        console.log("Listing the products");
      } else {
        console.log("Database is not yet ready, need to create");
        this.db.createDatabase();
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      color: "primary",
      message: "Success.",
      duration: 2000
    });
    toast.present();
  }

  takeSnap() {
    console.log("Taking a snapshot");
    this.camera.getPicture(this.cameraOptions).then(
      imageData => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI

        let base64Image = "data:image/jpeg;base64," + imageData;
        this.capturedSnapURL = base64Image;
      },
      err => {
        console.log(err);
        // Handle error
      }
    );
  }

  addDeveloper() {
    let skills = this.developer["skills"].split(",");
    skills = skills.map(skill => skill.trim());

    this.db
      .addDeveloper(this.developer["name"], skills, this.capturedSnapURL)
      .then(_ => {
        this.developer = {};
        this.capturedSnapURL = null;
        this.presentToast();
      });
  }

  addProduct() {
    this.db
      .addProduct(this.product["name"], this.product["creator"])
      .then(_ => {
        this.product = {};
        this.presentToast();
      });
  }
}
