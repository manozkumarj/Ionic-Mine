import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.page.html',
  styleUrls: ['./issue-details.page.scss'],
})
export class IssueDetailsPage implements OnInit {

  email;
  phoneNumber;
  description;
  issueId

  
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      console.log(params["id"]);
      this.issueId = params["id"];
      console.log(this.issueId);
    })
  }

  submit() {
    console.log("Form is submitted, values are below");
    console.log("email address -> " + this.email);
    console.log("phoneNumber -> " + this.phoneNumber);
    console.log("description -> " + this.description);

    this.apiService
    .saveIssue(
      this.commonService.currentDoctorId,
      this.issueId,
      this.email,
      this.phoneNumber,
      this.description
    )
    .subscribe(data => {
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast(
          "Something went wrong",
          "toastError"
        );
      } else {
        console.log(data);
        this.commonService.presentToast(
          "issue Details saved successfully",
          "toastSuccess"
        );
        
        this.router.navigate(['/help-center']);
      }
    });
    

}
}