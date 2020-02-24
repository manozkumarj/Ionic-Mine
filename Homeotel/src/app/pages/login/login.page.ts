import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formsDivHeight = '215px';

  loginLeftValue;
  registerLeftValue;
  btnLeftValue;

  constructor() { }

  ngOnInit() {
  }

  register() {
    this.formsDivHeight = "315px";
    this.loginLeftValue = "-400px";
    this.registerLeftValue = "50px";
    this.btnLeftValue = "110px";
    console.log("register() triggered");
  }

  login() {
    this.formsDivHeight = "215px";
    this.loginLeftValue = "50px";
    this.registerLeftValue = "450px";
    this.btnLeftValue = "0px";
    console.log("login() triggered");
  }

}
