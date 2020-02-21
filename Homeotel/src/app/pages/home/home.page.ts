import { Component, OnInit } from '@angular/core';
import { CommonService } from "./../../services/common.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  search() {
    console.log("Clicked on Search");
  }

}
