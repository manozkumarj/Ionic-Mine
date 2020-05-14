import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayQueuePageRoutingModule } from './today-queue-routing.module';

import { TodayQueuePage } from './today-queue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayQueuePageRoutingModule
  ],
  declarations: [TodayQueuePage]
})
export class TodayQueuePageModule {}
