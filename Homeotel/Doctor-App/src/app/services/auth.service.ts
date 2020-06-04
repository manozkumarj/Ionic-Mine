import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Platform } from "@ionic/angular";

@Injectable({ providedIn: "root" })
export class AuthService {
  isLoggedIn = false;

  user$: Observable<any>;

  constructor(public platform: Platform) {}

  isAuthenticated() {
    return this.isLoggedIn;
  }
}
