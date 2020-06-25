import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FamilyMembersPageRoutingModule } from "./family-members-routing.module";

import { FamilyMembersPage } from "./family-members.page";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilyMembersPageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [FamilyMembersPage],
})
export class FamilyMembersPageModule {}
