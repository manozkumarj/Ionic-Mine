import { Component } from '@angular/core';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentScreenOrientation: string;

  constructor(private screenOrientation: ScreenOrientation) {
    // Changing the app orientation to 'Landscape' and locking it while opening the app.
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    // get current
    this.currentScreenOrientation = this.screenOrientation.type; // logs the current orientation, example: 'landscape'

    // detect orientation changes
    this.screenOrientation.onChange().subscribe(
      () => {
        alert("Orientation Changed" + this.screenOrientation.type);
        this.currentScreenOrientation = this.screenOrientation.type;
      }
    );
  }

  setLandscape() {
    // set to landscape
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  setPortrait() {
    // set to portrait
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  unlockScreen() {
    // allow user rotate
    this.screenOrientation.unlock();
  }

}