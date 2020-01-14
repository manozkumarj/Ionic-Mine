import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root"
})
export class FcmServices {
  constructor(
    private platform: Platform,
    public http: HttpClient,
    private storageService: StorageService
  ) {
    console.log("Hello FcmProvider Provider");
  }

  ipAddress = "192.168.43.22";
  port = 6688;

  async storeToken(token) {
    console.log("Token is, from FCM service -> " + token);

    let body = {
      token
    };

    // Post the token to your node server
    this.http
      .post(`http://${this.ipAddress}:${this.port}/storeToken`, body)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
          alert("Token has been inserted successfully...");

          this.storageService
            .set("storedToken", token)
            .then(result => {
              console.log("Token is saved");
            })
            .catch(e => {
              console.error("error: Token is not stored " + JSON.stringify(e));
            });
        },
        error => {
          console.log("Token insertion error");
          console.log(JSON.stringify(error));
          alert("Error -> Token is not inserted...");
        }
      );
  }

  insertItem() {
    let d = new Date();
    let seconds = d.getTime();
    let itemArray = {
      item: "item inserted @ " + seconds
    };
    this.http
      .post(`http://${this.ipAddress}:${this.port}/insertItem`, itemArray)
      .subscribe(
        data => {
          console.log("Item is inserted");
        },
        error => {
          console.error("Item is not inserted, reason is below");
          console.error(JSON.stringify(error));
        }
      );
  }
}
