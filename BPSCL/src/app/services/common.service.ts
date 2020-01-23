import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: "root"
})
export class CommonService {

    newDate = new Date();
    dateTime: string;

    constructor(private alertCtrl: AlertController, private storageService: StorageService) {
        this.dateTime = this.getDateTime(this.newDate);
    }

    beneficiaryDetails: Object = {
        userPhoto: 'assets/profile_pic.jpg',
        userName: '',
        userSurname: '',
        userAge: null,
        userGender: '',
        userDOJ: '',
        userDistrict: '',
        userMandal: '',
        userVillage: '',
        userPatientId: '',
        userVisitId: '',
        userVisitCount: '',
        userDeviceId: '',
        userVanId: '',
        userRouteVillageId: '',
        userServicePointId: '',
        userCompoundPatientId: '',
        age: '',
        ageTypeId: '',
        pregnancyStatus: ''
    }

    sessionDetails: Object = {
        stateId: null,
        districtId: null,
        mandalId: null,
        villageId: null,
        servicePointId: null,
        servicePointName: 'Loading...',
        servicePointCode: null
    }

    userDetails: Object = {
        firstName: null,
        lastName: null,
        fullName: null,
        userId: null,
        roleId: null,
        deviceId: null,
        vanId: null
    }

    makeBenObjectEmpty() {
        this.beneficiaryDetails = {};
        this.beneficiaryDetails['userPhoto'] = 'assets/profile_pic.jpg';
    }

    makeUserObjectEmpty() {
        this.userDetails = {};
    }

    makeSessionObjectEmpty() {
        this.sessionDetails = {};
    }

    getDateTime(myDate) {
        return (
            myDate.getFullYear() +
            "-" +
            this.padDatePart(myDate.getMonth() + 1) +
            "-" +
            this.padDatePart(myDate.getDate())
        );
    }

    padDatePart(part) {
        return ("0" + part).slice(-2);
    }

    logout() {
        this.alertCtrl
            .create({
                header: "Are you sure?",
                message: "Do you want to logout?",
                buttons: [
                    {
                        text: "Cancel",
                        role: "cancel"
                    },
                    {
                        text: "Delete",
                        handler: () => {
                            alert("User will be logged out");
                            // this.storageService.clear();
                        }
                    }
                ]
            })
            .then(alertEl => {
                alertEl.present();
            });
    }

}
