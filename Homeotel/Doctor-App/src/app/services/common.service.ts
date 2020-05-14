import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  isAttender: boolean;
  currentDoctorId;
  currentDoctorName;
  currentDoctorPhoto;
  currentUserId;
  currentRelativeId;
  doctorPersonal: any = [];
  genders = [];
  specialisations = [];
  qualifications = [];
  certifications = [];
  awards = [];
  doctors;
  familyMembers;
  diagnosis =[];
  currentAppointmentId;
  currentDrugId=0;
  currentDrugs =[];
  foundDoctor: boolean = false;
appointmentDoctorDetails = {};
  appointmentDetails = {};
  selectedAppointmentComplaintDetails ={};

  selectedHomeKitCost;
  filteredMenu = [];
  dates = [
    { id: 0, day: "Sunday" },
    { id: 1, day: "Monday" },
    { id: 2, day: "Tuesday" },
    { id: 3, day: "Wednesday" },
    { id: 4, day: "Thursday" },
    { id: 5, day: "Friday" },
    { id: 6, day: "Saturday" },
  ];

  timings = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];
  sideMenu = [
    {
      title: "Today's Queue",
      url: "/today-queue",
      icon: "list",
      isAttender: true,
    },
    {
      title: "Appointments",
      url: "/scheduled-appointments",
      icon: "calendar",
      isAttender: true,
    },
    {
      title: "Homeo Kits",
      url: "/homeo-kits",
      icon: "medkit",
      isAttender: false,
    },
    {
      title: "Previous Consultations",
      url: "/previous-consultations",
      icon: "checkmark-circle",
      isAttender: false,
    },

    {
      title: "Payments",
      url: "/payments",
      icon: "cash",
      isAttender: false,
    },

    {
      title: "Settings",
      url: "/settings",
      icon: "settings",
      isAttender: true,
    },
    {
      title: "Help Center",
      url: "/help-center",
      icon: "help-circle",
      isAttender: true,
    },
  ];

  consultations = [
    {
      id: 1,
      icon: "videocam",
      type: "Video Consultation",
      fees: "Min session 10 mins ₹ 30 per minute",
    },
    {
      id: 2,
      icon: "logo-whatsapp",
      type: "Audio Consultation",
      fees: "Min session 10 mins ₹ 20 per minute",
    },
    {
      id: 3,
      icon: "chatbubbles",
      type: "Chat Consultation",
      fees: "Valid for 24 hours ₹ 50 ",
    },
    {
      id: 4,
      icon: "calendar",
      type: "Physical Visit",
      fees: "Regular Consulatation ₹ 500",
    },
  ];

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private toastController: ToastController
  ) {
    this.doctors = [
      {
        id: 1,
        name: "Uday Kumar",
        img: "assets/images/bill.jpg",
      },
      {
        id: 2,
        name: "Bharat Raj",
        img: "assets/images/larry.jpg",
      },
      {
        id: 3,
        name: "Manoj Kumar",
        img: "assets/images/zuck.jpg",
      },
      {
        id: 4,
        name: "Mallesh",
        img: "assets/images/mark.jpg",
      },
      {
        id: 5,
        name: "Rohit Kumar",
        img: "assets/images/sergey.jpg",
      },
      {
        id: 6,
        name: "Maruthi",
        img: "assets/images/warren.jpg",
      },
    ];

    this.familyMembers = [
      {
        id: 1,
        name: "Uday Kumar",
        img: "assets/images/bill.jpg",
        relation: "Mother",
      },
      {
        id: 2,
        name: "Bharat Raj",
        img: "assets/images/larry.jpg",
        relation: "Father",
      },
      {
        id: 3,
        name: "Manoj Kumar",
        img: "assets/images/zuck.jpg",
        relation: "Son",
      },
      {
        id: 4,
        name: "Mallesh",
        img: "assets/images/mark.jpg",
        relation: "Daughter",
      },
      {
        id: 5,
        name: "Rohit Kumar",
        img: "assets/images/sergey.jpg",
        relation: "Grand-son",
      },
      {
        id: 6,
        name: "Maruthi",
        img: "assets/images/warren.jpg",
        relation: "Grand-daughter",
      },
    ];
  }

  logout() {
    this.alertCtrl
      .create({
        header: "Are you sure?",
        message: "Do you want to logout?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Logout",
            handler: () => {
              // alert("User will be logged out");
              this.router.navigate(["/login"]);
              // this.storageService.clear();
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  updatedSideMenu() {
    this.filteredMenu = [];
    if (this.isAttender) {
      console.log("attender");
      this.sideMenu.forEach((data) => {
        if (data.isAttender) {
          this.filteredMenu.push(data);
        }
      });
      console.log(this.filteredMenu);
    } else {
      this.filteredMenu = this.sideMenu;
    }

    return this.filteredMenu;
  }

  async presentToast(message, cssClass) {
    let toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: "bottom",
      cssClass: cssClass,
    });

    await toast.present();
  }
}
