import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

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

  focusedForm = 'login';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.formsDivHeight = "315px";
    this.loginLeftValue = "-400px";
    this.registerLeftValue = "25px";
    this.btnLeftValue = "110px";

    this.focusedForm = 'register';
    console.log("register() triggered");
  }

  login() {
    this.formsDivHeight = "215px";
    this.loginLeftValue = "25px";
    this.registerLeftValue = "450px";
    this.btnLeftValue = "0px";

    this.focusedForm = 'login';
    console.log("login() triggered");
  }

  submit() {
    let focused;
    if (this.focusedForm == 'login') {
      focused = 'login';
      // this.register();
      this.router.navigate(["/home"]);
    } else {
      focused = 'register';
      this.login();
    }
    console.log("submit() triggered - focused form is -> " + focused);
  }

}
