import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-doctor-profile',
  templateUrl: './edit-doctor-profile.page.html',
  styleUrls: ['./edit-doctor-profile.page.scss'],
})
export class EditDoctorProfilePage implements OnInit {

  menu =[
    { name :"Personal" , link :"/doctor-personal"},
    { name :"Professional" , link :"/doctor-professional"},
    { name :"Clinics" , link :"/doctor-clinics"},
    { name :"Consultation Modes" , link :"/doctor-consultation-modes"},
  ]

  constructor() { }

  ngOnInit() {
  }

}
