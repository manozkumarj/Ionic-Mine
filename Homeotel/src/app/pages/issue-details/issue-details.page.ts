import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

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
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params["id"]);
      this.issueTypeId = params["id"];
      console.log(this.issueTypeId);
    });
  }

  submit() {
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
      this.apiService
        .saveIssue(
          this.issueTypeId,
          this.email,
          this.phoneNumber,
          this.description
        )
        .subscribe((data) => {
          if (this.utilities.isInvalidApiResponseData(data)) {
            console.log(data);
          } else {
            console.log(data);
            this.presentModal();
            this.router.navigate(["/help-center"]);
          }
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
