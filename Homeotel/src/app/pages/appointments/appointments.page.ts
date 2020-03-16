import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  backButton = e => {
    console.log("Back button triggered");
    e.preventDefault();
    event.stopPropagation();
    console.log('hello');
    return false;
  }

}
