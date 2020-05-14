import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-health-records",
  templateUrl: "./health-records.page.html",
  styleUrls: ["./health-records.page.scss"]
})
export class HealthRecordsPage implements OnInit {
  healthRecords;

  selectedPerson;

  constructor(private activatedRoute : ActivatedRoute) {
    
  }

  ngOnInit() {
     this.activatedRoute.params.subscribe(params=>{
      this.loadHealthRecords(params["userId"] , params["relativeId"])
     })
    
  }


  loadHealthRecords(userId , relativeId){
    this.healthRecords = [
      {
        id: 1,
        name: "Vitals",
        redirectUrl: `/vitals/${userId}/${relativeId}`
      },
      {
        id: 3,
        name: "Medical History",
        redirectUrl: `/medical-history/${userId}/${relativeId}`
      },
      {
        id: 4,
        name: "Lifestyle",
        redirectUrl: `/lifestyle/${userId}/${relativeId}`
      },
      {
        id: 5,
        name: "Files",
        redirectUrl: `/files/${userId}/${relativeId}`
      },
      {
        id: 6,
        name: "Previous Consultations",
        redirectUrl: `/user-consultation-details/${userId}/${relativeId}`
      }
    ];
  }

  person(id) {
    console.log("Selected person ID -> " + id);
    this.selectedPerson = id;
  }
}
