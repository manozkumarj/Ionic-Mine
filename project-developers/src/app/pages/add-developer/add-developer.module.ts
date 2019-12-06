import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddDeveloperPageRoutingModule } from "./add-developer-routing.module";

import { AddDeveloperPage } from "./add-developer.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddDeveloperPageRoutingModule
  ],
  declarations: [AddDeveloperPage]
})
export class AddDeveloperPageModule {}
