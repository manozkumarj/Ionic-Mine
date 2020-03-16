import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CommonService } from "../../services/common.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  action;

  constructor(
    public modalCtrl: ModalController,
    navParams: NavParams,
    private commonService: CommonService
  ) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('action'));
    this.action = navParams.get('action');
  }

  ngOnInit() {
  }

  addDoctor = () => {
    this.commonService.foundDoctor = true;
    this.onCancel();
  }

  onCancel = () =>
    this.modalCtrl.dismiss('cancel');

}
