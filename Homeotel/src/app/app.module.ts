import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ModalPage } from "./pages/modal/modal.page";

import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { WheelSelector } from "@ionic-native/wheel-selector/ngx";

@NgModule({
  declarations: [AppComponent, ModalPage],
  entryComponents: [ModalPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    WheelSelector,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
