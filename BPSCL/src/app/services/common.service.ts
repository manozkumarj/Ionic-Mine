import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CommonService {
    constructor() { }

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
        userCompoundPatientId: ''
    }

    sessionDetails: Object = {
        stateId: null,
        districtId: null,
        mandalId: null,
        villageId: null,
        servicePointId: null,
        servicePointName: null,
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

}
