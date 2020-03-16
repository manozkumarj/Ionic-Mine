import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonService } from "../../services/common.service";

@Component({
  selector: 'app-homeo-kits',
  templateUrl: './homeo-kits.page.html',
  styleUrls: ['./homeo-kits.page.scss'],
})
export class HomeoKitsPage implements OnInit {

  constructor(
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

  buyKit = cost => {
    console.log("Selected kit cost is -> " + cost);
    this.commonService.selectedHomeKitCost = cost;
    this.router.navigate(["/payment-gateways"]);
  }

}
