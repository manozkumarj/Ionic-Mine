import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.page.html',
  styleUrls: ['./help-center.page.scss'],
})
export class HelpCenterPage implements OnInit {

  helpCenters;

  constructor() {
    this.helpCenters = [
      {
        id: 1,
        name: 'Booking an appoinment'
      },
      {
        id: 2,
        name: 'Wrong information'
      },
      {
        id: 3,
        name: 'Consultation Related'
      },
      {
        id: 4,
        name: 'Homeo kits Related'
      },
      {
        id: 5,
        name: 'Other issues'
      }
    ];
  }

  ngOnInit() {
  }

}
