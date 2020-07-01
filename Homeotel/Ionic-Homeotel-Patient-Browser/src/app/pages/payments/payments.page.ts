import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.page.html",
  styleUrls: ["./payments.page.scss"],
})
export class PaymentsPage implements OnInit {
  totalNetAmount = 0.0;
  payments = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private loadingController: LoadingController,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    if (this.utilities.isHybridApp) {
      this.loadTotalNetAmountFromSqlLite();
      this.loadPaymentsFromSqlLite();
    } else {
      this.loadPayments();
    }
  }

  async loadPayments() {
    const loading = await this.loadingController
      .create({
        message: "loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService
            .getPayments(this.utilities.userId)
            .subscribe((data) => {
              a.dismiss();
              if (this.utilities.isInvalidApiResponseData(data)) {
                console.log(data);
                this.utilities.presentToastWarning("Something went wrong");
              } else {
                console.log(data);

                if (data[0][0].total_net_amount) {
                  console.log("test");
                  this.totalNetAmount = data[0][0].total_net_amount.toFixed(2);
                }

                console.log(data[1].length);
                this.payments = [];
                if (data[1].length > 0) {
                  data[1].forEach((data) => {
                    var transactionType;
                    var image;

                    if (data.transaction_for == "kit") {
                      transactionType = data.kit_name;
                      image = data.kit_image
                        ? data.kit_image
                        : "assets/images/homeokit-1.jpg";
                    } else {
                      transactionType = data.mode_name;
                      image = data.user_photo;
                    }

                    this.payments.push({
                      displayName: data.user_name,
                      transactionType: transactionType,
                      transactionDate: data.transaction_at,
                      transactionTypeId: data.transaction_type_id,
                      netAmount: data.net_amount.toFixed(2),
                      image,
                    });
                  });
                }
                this.utilities.presentToastSuccess("data loaded successfully");
              }
            });
        });
      });
  }

  getAmountColor(id) {
    var displayColor;
    if (id == 1 || id == 3) {
      displayColor = "green";
    } else {
      displayColor = "red";
    }
    return displayColor;
  }

  async loadTotalNetAmountFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getTotalNetAmount(this.utilities.userId)
            .then((res) => {
              console.log(res);
              this.totalNetAmount = res[0];
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "PaymentsPage * loadTotalNetAmountFromSqlLite",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
            });
          a.dismiss();
        });
      });
  }

  async loadPaymentsFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getPayments(this.utilities.userId)
            .then((res: any[]) => {
              console.log(res);
              this.payments = [];
              this.payments = res;
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "PaymentsPage * loadTotalNetAmountFromSqlLite",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(JSON.stringify(error));
            });
          a.dismiss();
        });
      });
  }
}
