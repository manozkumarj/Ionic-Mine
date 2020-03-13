import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.page.html',
  styleUrls: ['./health-records.page.scss'],
})
export class HealthRecordsPage implements OnInit {

  healthRecords;

  constructor() {
    this.healthRecords = [
      {
        id: 1,
        name: 'Vitals'
      },
      {
        id: 2,
        name: 'Health Tracker'
      },
      {
        id: 3,
        name: 'Medical History'
      },
      {
        id: 4,
        name: 'Lifestyle'
      },
      {
        id: 5,
        name: 'Files'
      },
      {
        id: 6,
        name: 'Previous Consultations'
      },
      {
        id: 7,
        name: 'Share Health Records'
      }
    ];
  }

  ngOnInit() {
  }

}
