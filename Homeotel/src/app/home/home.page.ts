import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginLeftValue;
  registerLeftValue;
  btnLeftValue;

  constructor() { }

  register() {
    this.loginLeftValue = "-400px";
    this.registerLeftValue = "50px";
    this.btnLeftValue = "110px";
    console.log("login() triggered");
  }

  login() {
    this.loginLeftValue = "50px";
    this.registerLeftValue = "450px";
    this.btnLeftValue = "0px";
    console.log("register() triggered");
  }

}
