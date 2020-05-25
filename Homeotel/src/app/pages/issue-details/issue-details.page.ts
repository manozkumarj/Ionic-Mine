import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-issue-details",
  templateUrl: "./issue-details.page.html",
  styleUrls: ["./issue-details.page.scss"],
})
export class IssueDetailsPage implements OnInit {
  email;
  phoneNumber;
  description;
  issueTypeId;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public modalCtrl: ModalController,
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params["id"]);
      this.issueTypeId = params["id"];
      console.log(this.issueTypeId);
    });
  }

  async submit() {
    console.log("Form is submitted, values are below");
    console.log("this.issueTypeId -> " + this.issueTypeId);
    console.log("email address -> " + this.email);
    console.log("phoneNumber -> " + this.phoneNumber);
    console.log("description -> " + this.description);

    if (
      this.issueTypeId &&
      this.email &&
      this.phoneNumber &&
      this.description
    ) {
      console.log("Form can be submitted");

      const loading = await this.loadingController
        .create({
          message: "Saving...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
            this.apiService
              .saveIssue(
                this.issueTypeId,
                this.email,
                this.phoneNumber,
                this.description
              )
              .subscribe((data) => {
                if (this.utilities.isInvalidApiResponseData(data)) {
                  a.dismiss();
                  console.log(data);
                } else {
                  console.log(data);

                  let res = data[0][0];
                  if (data[0][0]["query"]) {
                    let receivedQuery = res["query"];
                    console.log(receivedQuery);

                    this.db
                      .crudOperations(receivedQuery)
                      .then((res) => {
                        a.dismiss();
                        console.log("Issue added successfully");
                        this.presentModal();
                        this.router.navigate(["/help-center"]);
                      })
                      .catch((error) => {
                        this.utilities.presentToastWarning(
                          "Something went wrong."
                        );
                        a.dismiss();
                        console.error(
                          "Error -> SaveIssue function returned error." +
                            JSON.stringify(error)
                        );
                      });
                  } else {
                    a.dismiss();
                    this.utilities.presentToastWarning("Something went wrong.");
                    console.log(
                      "Query property is not received from backend SP"
                    );
                  }
                }
              });
          });
        });
    } else {
      alert("All fields are mandatory");
    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      showBackdrop: true,
      cssClass: "findDoctorModal",
      componentProps: {
        action: "submition",
      },
    });
    return await modal.present();
  }
}
