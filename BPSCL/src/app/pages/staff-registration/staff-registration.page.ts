import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-staff-registration',
  templateUrl: './staff-registration.page.html',
  styleUrls: ['./staff-registration.page.scss'],
})
export class StaffRegistrationPage implements OnInit {
  staffRegForm: FormGroup;

  isPhotoCaptured: boolean = false;
  benPhoto: string = "assets/profile_pic.jpg";

  constructor(
    private db: DatabaseService,
    private router: Router,
    private camera: Camera,
    private storageService: StorageService) {

    this.staffRegForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      fatherName: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
      ageType: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      doj: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      roleId: new FormControl("", Validators.required),
      userName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required)
    })
  }

  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  ngOnInit() {
  }

  takeSnap() {
    console.log("Taking a snapshot");
    this.camera.getPicture(this.cameraOptions).then(
      imageData => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.benPhoto = base64Image;
        this.isPhotoCaptured = true;
      },
      error => {
        console.log("Error - takeSnap() returned error --> " + error);
      }
    );
  }

  resetValues() {
    this.staffRegForm.patchValue({
      firstName: '',
      lastName: '',
      fatherName: '',
      gender: '',
      age: '',
      ageType: '',
      dob: '',
      doj: '',
      address: '',
      phone: '',
      email: '',
      roleId: '',
      userName: '',
      password: '',
      confirmPassword: ''
    });
    this.isPhotoCaptured = false;
  }


  onSubmit(values) {
    console.log("Staff Registration form is submitted, below are the values");
    console.log(values);

    let firstName = this.staffRegForm.get("firstName").value.trim();
    let lastName = this.staffRegForm.get("lastName").value.trim();
    let fatherName = this.staffRegForm.get("fatherName").value.trim();
    let gender = this.staffRegForm.get("gender").value.trim();
    let age = this.staffRegForm.get("age").value;
    let ageType = this.staffRegForm.get("ageType").value.trim();
    let dob = this.staffRegForm.get("dob").value.trim();
    let doj = this.staffRegForm.get("doj").value.trim();
    let address = this.staffRegForm.get("address").value.trim();
    let phone = this.staffRegForm.get("phone").value.trim();
    let email = this.staffRegForm.get("email").value.trim();
    let roleId = this.staffRegForm.get("roleId").value.trim();
    let userName = this.staffRegForm.get("userName").value.trim();
    let password = this.staffRegForm.get("password").value.trim();
    let confirmPassword = this.staffRegForm.get("confirmPassword").value.trim();

    if (!firstName || firstName == null) {
      alert("Enter First Name");
      return false;
    }
    if (!lastName || lastName == null) {
      alert("Enter Last Name");
      return false;
    }
    if (!fatherName || fatherName == null) {
      alert("Enter Father Name");
      return false;
    }
    if (!gender || gender == null) {
      alert("Please Select Gender");
      return false;
    }
    if (!age || age == null) {
      alert("Please Enter Age");
      return false;
    }
    if (!ageType || ageType == null) {
      alert("Please Select Age Type");
      return false;
    }
    if (!dob || dob == null) {
      alert("Please Enter Date of Birth");
      return false;
    }
    if (!doj || doj == null) {
      alert("Please Enter Date of Joining");
      return false;
    }
    if (!address || address == null) {
      alert("Please Enter Address");
      return false;
    }
    if (!phone || phone == null) {
      alert("Please Enter Phone Number");
      return false;
    }
    if (!email || email == null) {
      alert("Please Enter Email Number");
      return false;
    }
    if (!roleId || roleId == null) {
      alert("Please Select Role");
      return false;
    }
    if (!userName || userName == null) {
      alert("Please Enter Username");
      return false;
    }
    if (!password || password == null) {
      alert("Please Enter Password");
      return false;
    }
    if (!confirmPassword || confirmPassword == null) {
      alert("Please Enter Confirm Password");
      return false;
    }
    if (confirmPassword != password) {
      alert("Passwords didn't match");
      return false;
    }
    if (!this.isPhotoCaptured) {
      alert("Please Capture photo");
      return false;
    }

  }

}
