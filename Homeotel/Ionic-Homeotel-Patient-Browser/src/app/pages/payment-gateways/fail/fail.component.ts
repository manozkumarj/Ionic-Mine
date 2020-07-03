import { Component, OnInit } from '@angular/core';
import { BroadcastChannel } from 'broadcast-channel';

@Component({
  selector: 'app-fail',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.scss'],
})
export class PaymentFailComponent implements OnInit {

  constructor() {
    const channel = new BroadcastChannel('payment_message');
    channel.postMessage('fail');
  }

  ngOnInit() {}

}
