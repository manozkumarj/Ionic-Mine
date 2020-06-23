import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddRelativePageRoutingModule } from "./add-relative-routing.module";

import { AddRelativePage } from "./add-relative.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRelativePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddRelativePage],
})
export class AddRelativePageModule {}
