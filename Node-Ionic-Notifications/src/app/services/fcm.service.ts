import { Injectable } from "@angular/core";
import { Firebase } from "@ionic-native/firebase/ngx";
import { Platform } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FcmServices {
  constructor(
    private platform: Platform,
    public firebaseNative: Firebase,
    public http: HttpClient
  ) {
    console.log("Hello FcmProvider Provider");
  }

  ipAddress = "192.168.43.22";

  // Get permission from the user
  async getToken() {
    let token;

    if (this.platform.is("android")) {
      token = await this.firebaseNative.getToken();
    }

    if (this.platform.is("ios")) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
    console.log("Token is -> " + token);
    // Post the token to your node server
    this.http.post(`${this.ipAddress}:6688/storeToken`, token).subscribe(
      data => {
        console.log(JSON.stringify(data));
      },
      error => {
        console.log("err");
        console.log(JSON.stringify(error));
      }
    );
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }
}
