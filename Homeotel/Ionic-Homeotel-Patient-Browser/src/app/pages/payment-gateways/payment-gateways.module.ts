import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentGatewaysPageRoutingModule } from './payment-gateways-routing.module';
import { PaymentGatewaysPage } from './payment-gateways.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentGatewaysPageRoutingModule
  ],
  declarations: [PaymentGatewaysPage]
})
export class PaymentGatewaysPageModule {}
