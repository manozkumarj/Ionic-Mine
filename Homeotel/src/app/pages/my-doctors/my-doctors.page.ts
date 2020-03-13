import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-doctors',
  templateUrl: './my-doctors.page.html',
  styleUrls: ['./my-doctors.page.scss'],
})
export class MyDoctorsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  inputKeyUp(e) {
    var target = e.srcElement;
    var maxLength = parseInt(target.attributes["maxlength"].value, 6);
    var myLength = target.value.length;
    if (myLength >= maxLength) {
      var next = target;
      while (next = next.nextElementSibling) {
        if (next == null)
          break;
        if (next.tagName.toLowerCase() == "input") {
          next.focus();
          break;
        }
      }
    }
  }

}
