import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.page.html',
  styleUrls: ['./issue-details.page.scss'],
})
export class IssueDetailsPage implements OnInit {

  email;
  phoneNumber;
  description;

  constructor(private router: Router, public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  submit() {
    console.log("Form is submitted, values are below");
    console.log("email address -> " + this.email);
    console.log("phoneNumber -> " + this.phoneNumber);
    console.log("description -> " + this.description);
    // this.router.navigate(['/help-center']);
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      showBackdrop: true,
      cssClass: "findDoctorModal",
      componentProps: {
        'action': 'submition'
      }
    });
    return await modal.present();
  }


}
