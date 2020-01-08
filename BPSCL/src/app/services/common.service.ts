import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CommonService {
    constructor() { }

    userPhoto: string = 'assets/profile_pic.jpg';
    userName: string = '';
    userSurname: string = '';
    userAge: Number;
    userGender: string = '';
    userDOJ: string = '';
    userDistrict: string = '';
    userMandal: string = '';
    userVillage: string = '';

}
