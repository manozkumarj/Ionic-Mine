import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private db: DatabaseService
  ) {
    this.initializeApp();
    this.prepareDatabase();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  prepareDatabase() {
    this.db.checkTable()
      .then((res: any) => {
        if (!res) {
          this.db.seedSql();
          console.warn("Table doesn't exist, creating one :) -> " + JSON.stringify(res));
        } else {
          console.log("Table is already exist :) -> " + JSON.stringify(res));
        }
      })
      .catch((error: any) => {
        console.error("catch -> Table doesn't exist -> " + JSON.stringify(error));
        this.db.seedSql();
      });
  }

}
