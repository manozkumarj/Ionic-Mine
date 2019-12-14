import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BeneficiaryRegistrationPageRoutingModule } from "./beneficiary-registration-routing.module";

import { BeneficiaryRegistrationPage } from "./beneficiary-registration.page";
import { FooterPage } from "../footer/footer.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiaryRegistrationPageRoutingModule
  ],
  declarations: [BeneficiaryRegistrationPage, FooterPage]
})
export class BeneficiaryRegistrationPageModule {}
