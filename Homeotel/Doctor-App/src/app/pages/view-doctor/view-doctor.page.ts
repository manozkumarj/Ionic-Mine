import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../services/common.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.page.html',
  styleUrls: ['./view-doctor.page.scss'],
})
export class ViewDoctorPage implements OnInit {

  selectedDoctor;

  constructor(
    public commonService: CommonService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let selectedDoctorId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    console.log("selectedDoctorId ->" + selectedDoctorId);

    this.selectedDoctor = this.commonService.doctors.filter(doctor => doctor.id == selectedDoctorId)[0];
    console.log(this.selectedDoctor);

    // this.db
    //   .getDeveloper(id)
    //   .then(data => {
    //     this.developer = data;
    //   })
    //   .catch(error => {
    //     alert("Something went wrong while fetching developer details.");
    //   });
  }

}
