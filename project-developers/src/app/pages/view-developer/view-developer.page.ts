import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

import { ApiService } from "./../../services/api.service";
import { DatabaseService } from "./../../services/database.service";

@Component({
  selector: "app-view-developer",
  templateUrl: "./view-developer.page.html",
  styleUrls: ["./view-developer.page.scss"]
})
export class ViewDeveloperPage implements OnInit {
  developer;
  constructor(
    public api: ApiService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    // alert("Alert from Developer View page");
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));

    this.db
      .getDeveloper(id)
      .then(data => {
        this.developer = data;
      })
      .catch(error => {
        alert("Something went wrong while fetching developer details.");
      });
  }

  deleteDeveloper() {
    // alert(this.developer.id);
    let currentDeveloperId = this.developer.id;
    this.alertCtrl
      .create({
        header: "Are you sure?",
        message: "Do you want to delete this developer?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Delete",
            handler: () => {
              this.db
                .deleteDeveloper(currentDeveloperId)
                .then(() => {
                  this.router.navigate(["./all-developers/done"]);
                })
                .catch(error => {
                  alert("Something went wrong while deleting.");
                });
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
