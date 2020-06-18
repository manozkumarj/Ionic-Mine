import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "./user.model";

import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Platform } from "@ionic/angular";

@Injectable({ providedIn: "root" })
export class AuthService {
  isLoggedIn = false;

  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private gplus: GooglePlus,
    public platform: Platform
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  googleLogin() {
    this.nativeGoogleLogin();

    // if (this.platform.is("cordova")) {
    //   this.nativeGoogleLogin();
    // } else {
    //   this.webGooglelogin();
    // }
  }

  nativeGoogleLogin() {
    // alert("nativeGoogleLogin func triggered");
    this.gplus
      .login({
        webClientId:
          "1068240429142-octvvrtg33j5ioms4b1g01bh95f8ikee.apps.googleusercontent.com",
        offline: true,
      })
      .then(
        (res) => {
          console.log(res);
          alert(JSON.stringify(res));
          this.isLoggedIn = true;
          this.router.navigate(["/home"]);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  logout() {
    this.gplus.logout().then(() => {
      console.log("logged out");
      return this.router.navigate(["/login"]);
    });
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(["/login"]);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    let userDetails = {
      key: user.uid,
      email: user.email,
      displayName: user.displayName,
    };

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    alert(JSON.stringify(userDetails));

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    this.router.navigate(["/home"]);
    return userRef.set(data, { merge: true });
  }
}
