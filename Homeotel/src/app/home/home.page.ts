import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formsDivHeight = '215px';

  loginLeftValue;
  registerLeftValue;
  btnLeftValue;

  constructor() { }

  register() {
    this.formsDivHeight = "315px";
    this.loginLeftValue = "-400px";
    this.registerLeftValue = "50px";
    this.btnLeftValue = "110px";
    console.log("login() triggered");
  }

  login() {
    this.formsDivHeight = "215px";
    this.loginLeftValue = "50px";
    this.registerLeftValue = "450px";
    this.btnLeftValue = "0px";
    console.log("register() triggered");
  }

}
