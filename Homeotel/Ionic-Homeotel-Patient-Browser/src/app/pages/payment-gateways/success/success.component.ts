import { Component, OnInit } from '@angular/core';
import { BroadcastChannel } from 'broadcast-channel';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class PaymentSuccessComponent implements OnInit {

  constructor() {
    const channel = new BroadcastChannel('payment_message');
    channel.postMessage('success');
   }

  ngOnInit() {}

}
