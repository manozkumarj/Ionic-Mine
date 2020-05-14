import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayQueuePage } from './today-queue.page';

const routes: Routes = [
  {
    path: '',
    component: TodayQueuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayQueuePageRoutingModule {}
