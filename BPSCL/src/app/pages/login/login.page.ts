import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  admins: any[] = [];
  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.db
      .getAdmins()
      .then(users => {
        this.admins = users;
        console.log("Total No. of users = " + users.length);
        console.log("Total users are ==> " + JSON.stringify(users));
      })
      .catch(error => {
        console.error("Database Error " + JSON.stringify(error));
      });
  }
}
