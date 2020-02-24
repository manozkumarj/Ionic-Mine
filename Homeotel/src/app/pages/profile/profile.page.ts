import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedGender = null;

  constructor() { }

  ngOnInit() {
  }

  moreOptions() {
    console.log("Clicked on moreOptions()");
  }

  toggleGender(id) {
    if (id == 1) {
      console.log("Selected gender is -> Male");
    } else {
      console.log("Selected gender is -> Female");
    }
    this.selectedGender = id;
  }

}
