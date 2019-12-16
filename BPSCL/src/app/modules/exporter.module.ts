import { NgModule } from "@angular/core";

import { UserDetailsPage } from "./../pages/common/user-details/user-details.page";
import { FooterPage } from "./../pages/common/footer/footer.page";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [UserDetailsPage, FooterPage],
  exports: [UserDetailsPage, FooterPage],
  imports: [IonicModule]
})
export class ExporterModule {}
