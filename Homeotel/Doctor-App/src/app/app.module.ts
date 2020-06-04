import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ModalPage } from "./pages/modal/modal.page";
import { ModalPageModule } from "./pages/modal/modal.module";

import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { WheelSelector } from "@ionic-native/wheel-selector/ngx";
import { environment } from "../environments/environment";

import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { SQLite } from "@ionic-native/sqlite/ngx";
import { HttpClientModule } from "@angular/common/http";
import { ApiService } from "./services/api.service";
import { UtilitiesService } from "./services/utilities.service";
import { AuthGuard } from "./services/auth-guard.service";

import { DatabaseService } from "./services/database.service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [ModalPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ModalPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    WheelSelector,
    ApiService,
    UtilitiesService,
    DatabaseService,
    AuthGuard,
    SQLite,
    SQLitePorter,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private db: DatabaseService) {
    this.db
      .createDb()
      .then((res) => {
        console.log("App module.ts - createDb - Database is ready");
      })
      .catch((error) => {
        console.warn(
          "App module.ts - createDb - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }
}
