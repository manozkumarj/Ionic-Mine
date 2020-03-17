import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slot-selection',
  templateUrl: './slot-selection.page.html',
  styleUrls: ['./slot-selection.page.scss'],
})
export class SlotSelectionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectSlot = (period, time) => {
    console.log("Slot selected for ->" + period + ' - ' + time);
    this.router.navigate(['/consultation-details']);
  }

}
