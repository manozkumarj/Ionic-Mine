import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { SQLite } from "@ionic-native/sqlite/ngx";
import { HttpClientModule } from "@angular/common/http";
import { Camera } from "@ionic-native/camera/ngx";
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ExporterModule } from "./modules/exporter.module";
import { DatabaseService } from "./services/database.service";
import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ExporterModule,
    ScreenOrientation,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatabaseService,
    Camera,
    SQLite,
    SQLitePorter,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private db: DatabaseService) {
    this.db
      .createDb()
      .then(res => {
        console.log("App module.ts - createDb - Database is ready");
      })
      .catch(error => {
        console.warn(
          "App module.ts - createDb - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }
}
