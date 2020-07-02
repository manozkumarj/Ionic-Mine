import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LifestylePageRoutingModule } from "./lifestyle-routing.module";

import { LifestylePage } from "./lifestyle.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LifestylePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LifestylePage],
})
export class LifestylePageModule {}
