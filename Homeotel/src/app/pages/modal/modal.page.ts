import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(public modalCtrl: ModalController, navParams: NavParams) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('cssClass'));
  }

  ngOnInit() {
  }

  onCancel = () =>
    this.modalCtrl.dismiss('cancel');

}
