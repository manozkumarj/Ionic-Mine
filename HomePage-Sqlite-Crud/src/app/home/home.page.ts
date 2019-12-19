import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { DatabaseService } from "./../services/database.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  row_data: any = [];

  showCreateDbBtn: boolean = false;
  showCreateTableBtn: boolean = false;
  showGetRowsBtn: boolean = true;

  constructor(private platform: Platform, private db: DatabaseService) {
    this.platform.ready().then(() => {
      this.db
        .getRows()
        .then(data => {
          this.showCreateDbBtn = true;
          this.showCreateTableBtn = true;
          this.showGetRowsBtn = false;
          this.row_data = data;
          alert("Fetched Data");
        })
        .catch(error => {
          alert("Data fetchint error " + JSON.stringify(error));
          console.log(error);
        });
    });
  }

  getRows() {
    this.db
      .getRows()
      .then(data => {
        this.row_data = data;
        this.showCreateDbBtn = true;
        this.showCreateTableBtn = true;
        this.showGetRowsBtn = false;
      })
      .catch(error => {
        alert("getRows error " + JSON.stringify(error));
      });
  }

  insertRow(name_model) {
    if (!name_model.length) {
      alert("Enter Name");
      return;
    } else {
      this.db
        .getRows()
        .then(data => {
          this.row_data = data;
          alert("Row Inserted!");
        })
        .catch(error => {
          alert("insertRow error " + JSON.stringify(error));
        });
    }
  }

  deleteRow(item) {
    this.db
      .getRows()
      .then(data => {
        this.row_data = data;
        alert("Row Deleted!");
      })
      .catch(error => {
        alert("deleteRow error " + JSON.stringify(error));
      });
  }
}
