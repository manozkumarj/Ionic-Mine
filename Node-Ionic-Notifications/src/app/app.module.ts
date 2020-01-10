import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

const config = {
  // your firebase web config
  apiKey: "AIzaSyDqhWuBeUBRhlZbawuy-xHXv8Fh1qICLZM",
  authDomain: "ionic-4-notification-app.firebaseapp.com",
  databaseURL: "https://ionic-4-notification-app.firebaseio.com",
  projectId: "ionic-4-notification-app",
  storageBucket: "ionic-4-notification-app.appspot.com",
  messagingSenderId: "110623990817",
  appId: "1:110623990817:web:9c54e7af9400dfdd90af60",
  measurementId: "G-9QEYHJ8FV7"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
