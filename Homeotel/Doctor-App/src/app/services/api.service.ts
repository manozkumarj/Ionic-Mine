import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  //@ts-checkapiUrl = "http://175.101.1.227:8123";
  //apiUrl = "http://localhost:3000";
  apiUrl = "http://175.101.1.227:8123";

  constructor(private http: HttpClient) {}

  login(userName, password) {
    var path = "/doctor/login";
    var body = {
      userName: userName,
      password: password
    };
    return this.http.post(this.apiUrl + path, body);
  }

  register(userName, email, password) {
    var path = "/doctor/register";
    var body = {
      userName: userName,
      email: email,
      password: password
    };
    return this.http.post(this.apiUrl + path, body);
  }

  savePersonalData(doctorId, name, phone, email, gender, dob) {
    var path = "/doctor/personal";
    var body = {
      doctorId: doctorId,
      name: name,
      phone: phone,
      email: email,
      gender: gender,
      dob: dob
    };
    return this.http.post(this.apiUrl + path, body);
  }

  getHomeoKits(doctorId) {
    var path = "/doctor/kits";

    return this.http.get(this.apiUrl + path + "/" + doctorId);
  }

  getHomeoKitDetail(doctorId, kitId) {
    var path = "/doctor/kit-detail";

    return this.http.get(this.apiUrl + path + "/" + doctorId + "/" + kitId);
  }

  saveHomeoKits(doctorId, kitName, kitDescription, kitPrice , kitImage) {
    var path = "/doctor/kit-save";
    var body = {
      doctorId: doctorId,
      kitName: kitName,
      kitDescription: kitDescription,
      kitPrice: kitPrice,
      kitImage : kitImage
    };
    return this.http.post(this.apiUrl + path, body);
  }

  updateHomeoKit(doctorId, kitId, kitName, kitDescription, kitPrice , kitImage) {
    var path = "/doctor/kit-update";
    var body = {
      doctorId: doctorId,
      kitId: kitId,
      kitName: kitName,
      kitDescription: kitDescription,
      kitPrice: kitPrice,
      kitImage : kitImage
    };
    return this.http.post(this.apiUrl + path, body);
  }

  getKitOrders(doctorId) {
    var path = "/doctor/orders";

    return this.http.get(this.apiUrl + path + "/" + doctorId);
  }

  getPreviousConsultations(doctorId) {
    var path = "/doctor/previous-consultations";

    return this.http.get(this.apiUrl + path + "/" + doctorId);
  }

  getTodayQueue(doctorId) {
    var path = "/doctor/today-queue";

    return this.http.get(this.apiUrl + path + "/" + doctorId);
  }
  getAppointments(doctorId) {
    var path = "/doctor/appointments";

    return this.http.get(this.apiUrl + path + "/" + doctorId);
  }

  getVitals(userId, relativeId) {
    var path = "/doctor/vitals";

    return this.http.get(this.apiUrl + path + "/" + userId + "/" + relativeId);
  }

  getMedicalHistory(userId, relativeId) {
    var path = "/doctor/medical-history";

    return this.http.get(this.apiUrl + path + "/" + userId + "/" + relativeId);
  }

  getLifeStyle(userId, relativeId) {
    var path = "/doctor/lifestyle";

    return this.http.get(this.apiUrl + path + "/" + userId + "/" + relativeId);
  }

  getIssueMaster() {
    var path = "/doctor/master/issue";

    return this.http.get(this.apiUrl + path);
  }

  saveIssue(doctorId ,issueType, email,phone, issueDescrption) {
    var path = "/doctor/issue";

    var body = {
      doctorId: doctorId,
      issueType: issueType,
      email: email,
      phone: phone,
      issueDescrption: issueDescrption
    };
    return this.http.post(this.apiUrl + path, body);
  }



  getConsultationDetails(doctorId , userId, relativeId) {
    var path = "/doctor/consultation-details";

    return this.http.get(this.apiUrl + path + "/" + doctorId+ "/" + userId + "/" + relativeId);
  }
  getAppointmentDetails(appointmentId ) {
    var path = "/doctor/appointment-details";

    return this.http.get(this.apiUrl + path + "/" + appointmentId);
  }


  getPayments(doctorId ) {
    var path = "/doctor/payments";

    return this.http.get(this.apiUrl + path + "/" + doctorId);
  }


  getUserPreviousConsultations(doctorId , userId , relativeId) {
    var path = "/doctor/user-previous-consultations";

    return this.http.get(this.apiUrl + path + "/" + doctorId + "/"+ userId + "/" +relativeId);
  }
  

  updateProfileDetails(doctorId , columnName , columnValue){
 var path ="/doctor/update-profile";

 var body ={
  doctorId : doctorId  ,
  columnName : columnName,
  columnValue : columnValue
 }

 return this.http.post(this.apiUrl + path , body);
  }

saveProfessional(doctorId , columnName , columnValue){
    var path ="/doctor/professional";
   
    var body ={
     doctorId : doctorId  ,
     columnName : columnName,
     columnValue : columnValue
    }
   
    return this.http.post(this.apiUrl + path , body);
     }


  getMasters(){

    var path ="/doctor/masters";

    return this.http.get(this.apiUrl +path);

  }

  getProfile(doctorId){

    var path ="/doctor/profile";

    return this.http.get(this.apiUrl +path + "/" + doctorId);

  }

  saveClinic(doctorId  , clinicName , clinicAddress , walkinFee , weekDays , fromTime , toTime) {
    var path = "/doctor/clinics";
    var body = {
      doctorId: doctorId,
      clinicName: clinicName,
      clinicAddress: clinicAddress,
      walkinFee: walkinFee,
      weekDays: weekDays,
      fromTime: fromTime,
      toTime: toTime,
     
    };
    console.log(body);
    return this.http.post(this.apiUrl + path, body);
  }

  updateClinic(doctorId , clinicId , clinicName , clinicAddress , walkinFee , weekDays , fromTime , toTime) {
    var path = "/doctor/clinics";
    var body = {
      doctorId: doctorId,
      clinicId : clinicId,
      clinicName: clinicName,
      clinicAddress: clinicAddress,
      walkinFee: walkinFee,
      weekDays: weekDays,
      fromTime: fromTime,
      toTime: toTime,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  getClinics(doctorId) {
    var path = "/doctor/clinics";

    return this.http.get(this.apiUrl + path + "/" + doctorId);
  }

  getClinicDetail(doctorId, clinicId) {
    var path = "/doctor/clinic";

    return this.http.get(this.apiUrl + path + "/" + doctorId + "/" + clinicId);
  }

  getModes(doctorId) {
    var path = "/doctor/modes";

    return this.http.get(this.apiUrl + path + "/" + doctorId);
  }

  getModeDetail(doctorId, modeId) {
    var path = "/doctor/mode";

    return this.http.get(this.apiUrl + path + "/" + doctorId + "/" + modeId);
  }
  saveMode(doctorId , modeId , session , price) {
    var path = "/doctor/modes";
    var body = {
      doctorId: doctorId,
      modeId: modeId,
      session: session,
      price: price,
     
     
    };
    return this.http.post(this.apiUrl + path, body);
  }
  saveDiagnosis(appointmentId , doctorId , userId , relativeId , columnName , columnValue) {
    var path = "/doctor/diagnosis";
    var body = {
      appointmentId : appointmentId,
       columnName : columnName ,
        columnValue : columnValue ,
        doctorId :doctorId,
         userId : userId ,
          relativeId : relativeId
      };
    return this.http.post(this.apiUrl + path, body);
  }


  savePrescription(appointmentId ,doctorId , userId , relativeId , drugId , columnName , columnValue) {
    var path = "/doctor/prescription";
    var body = {
      appointmentId : appointmentId,
       columnName : columnName ,
        columnValue : columnValue ,
        doctorId :doctorId,
         userId : userId ,
          relativeId : relativeId,
          drugId : drugId
      };
    return this.http.post(this.apiUrl + path, body);
  }
  getDrugDetail(appointmentId ,doctorId , userId , relativeId , drugId) {
    var path = "/doctor/drug-detail-get";

    return this.http.get(this.apiUrl + path +  "/" + appointmentId + "/" +doctorId + "/" + userId + "/" + relativeId + "/" + drugId);
  }


  getPrecription(appointmentId) {
    var path = "/doctor/prescription";

    return this.http.get(this.apiUrl + path +  "/" + appointmentId)
  }


  getDoctorConsultantDetailsMasters(doctorId) {
    var path = "/doctor/doctor-consultant-details-masters";

    return this.http.get(this.apiUrl + path +  "/" + doctorId)
  }

  cancelAppointment(appointmentId) {
    var path = "/doctor/cancel-appointment";
    var body = {
      appointmentId : appointmentId,  
      };
    return this.http.post(this.apiUrl + path, body);
  }

  updateAppointmentTime(appointmentId , appointmentAt) {
    var path = "/doctor/update-appointment-time";
    var body = {
      appointmentId : appointmentId, 
      appointmentAt : appointmentAt 
      };
    return this.http.post(this.apiUrl + path, body);
  }

  saveDoctorImage(doctorId , photo) {
    var path = "/doctor/save-doctor-image";
    var body = {
      doctorId : doctorId, 
      photo : photo 
      };
    return this.http.post(this.apiUrl + path, body);
  }

  getFiles(userId , relativeId) {
    var path = "/doctor/files-get";

    return this.http.get(this.apiUrl + path +  "/"  + userId + "/" + relativeId);
  }

  getFileImage(fileId) {
    var path = "/doctor/file-image";

    return this.http.get(this.apiUrl + path +  "/"  + fileId );
  }
}
