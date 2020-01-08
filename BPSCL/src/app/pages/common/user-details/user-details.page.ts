import { Component, OnInit } from '@angular/core';
import { CommonService } from "./../../../services/common.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

}
