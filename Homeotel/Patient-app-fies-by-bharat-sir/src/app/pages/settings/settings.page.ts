import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settings;

  constructor() {
    this.settings = [
      {
        id: 1,
        name: 'Notification settings'
      },
      {
        id: 2,
        name: 'Popup notification'
      },
      {
        id: 3,
        name: 'Privacy policy'
      },
      {
        id: 4,
        name: 'Help center'
      },
      {
        id: 5,
        name: 'About Homeotel'
      }
    ];
  }

  ngOnInit() {
  }

}
