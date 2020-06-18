import { Component, OnInit } from "@angular/core";
import { CommonService } from "./../../services/common.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-view-doctor",
  templateUrl: "./view-doctor.page.html",
  styleUrls: ["./view-doctor.page.scss"],
})
export class ViewDoctorPage implements OnInit {
  selectedDoctorId;

  selectedGender = null;
  specialisation = [];
  experience;
  doctorName;
  certification;
  qualification;
  doctorPhoto;
  clinics = [];
  videoConsultations = [];
  audioConsultations = [];
  chatConsultations = [];
  physicalVisits = [];
  specialisationMasters = [];
  qualificationMasters = [];
  certificationMasters = [];
  awardMasters = [];

  dates = [
    { id: 0, day: "Sunday" },
    { id: 1, day: "Monday" },
    { id: 2, day: "Tuesday" },
    { id: 3, day: "Wednesday" },
    { id: 4, day: "Thursday" },
    { id: 5, day: "Friday" },
    { id: 6, day: "Saturday" },
  ];

  constructor(
    private commonService: CommonService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private db: DatabaseService,
    private loadingController: LoadingController,
    public utilities: UtilitiesService
  ) {}

  ngOnInit() {
    this.selectedDoctorId = parseInt(
      this.activatedRoute.snapshot.paramMap.get("id")
    );
    console.log("selectedDoctorId ->" + this.selectedDoctorId);

    // this.db
    //   .getDeveloper(id)
    //   .then(data => {
    //     this.developer = data;
    //   })
    //   .catch(error => {
    //     alert("Something went wrong while fetching developer details.");
    //   });
  }

  ionViewWillEnter() {
    this.loadDoctorMasters();
  }

  async loadDoctorMasters() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present()
          .then(async (res) => {
            this.db.getDoctorMasters().then((res: any[]) => {
              console.log("Received doctorMasters details are below -> ");
              console.log(res);
              let doctorMasters = res;
              this.resetMasters();
              doctorMasters.forEach((data) => {
                if (data.master_type == "table_specialisation") {
                  this.specialisationMasters.push({
                    id: data.id,
                    name: data.name,
                  });
                } else if (data.master_type == "table_qualification") {
                  this.qualificationMasters.push({
                    id: data.id,
                    name: data.name,
                  });
                } else if (data.master_type == "table_certification") {
                  this.certificationMasters.push({
                    id: data.id,
                    name: data.name,
                  });
                } else if (data.master_type == "table_award") {
                  this.awardMasters.push({
                    id: data.id,
                    name: data.name,
                  });
                }
              });
              // this.loadProfile();
              this.loadDoctorProfileDetails();
              this.loadDoctorProfessionalDetails();
              this.loadDoctorClinicsDetails();
              this.loadDoctorModesDetails();
              // this.utilities.presentToastSuccess("data loaded successfully");
              a.dismiss();
            });
          })
          .catch((error) => {
            a.dismiss();
            this.utilities.sqliteErrorDisplayer(
              "view-doctor * loadDoctorMasters",
              error
            );
            this.utilities.presentToastWarning("Something went wrong");
            console.error(
              "Error -> loadDoctorMasters() function returned error." +
                JSON.stringify(error)
            );
          });
      });
  }

  resetMasters() {
    this.specialisationMasters = [];
    this.qualificationMasters = [];
    this.certificationMasters = [];
    this.awardMasters = [];
    this.clinics = [];
    this.videoConsultations = [];
    this.audioConsultations = [];
    this.chatConsultations = [];
    this.physicalVisits = [];
  }

  async loadDoctorProfileDetails() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorProfileDetails(this.selectedDoctorId)
            .then((res: any[]) => {
              console.log(res);
              this.doctorPhoto = res[0]["photo"];
              this.doctorName = res[0]["name"];
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "view-doctor * loadDoctorProfileDetails",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadDoctorProfileDetails() function returned error." +
                  JSON.stringify(error)
              );
            });
          a.dismiss();
        });
      });
  }

  async loadDoctorProfessionalDetails() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorProfessionalDetails(this.selectedDoctorId)
            .then((res: any[]) => {
              console.log(res);
              let receivedData = res[0];
              if (receivedData) {
                this.loadExperience(receivedData["experience"]);
                this.loadSpecialisation(receivedData["specialisation"]);
                this.loadQualifications(receivedData["qualifications"]);
                this.loadCertifications(receivedData["certifications"]);
              }
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "view-doctor * loadDoctorProfessionalDetails",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadDoctorProfessionalDetails() function returned error." +
                  JSON.stringify(error)
              );
            });
          a.dismiss();
        });
      });
  }

  async loadDoctorClinicsDetails() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorClinicsDetails(this.selectedDoctorId)
            .then((res: any[]) => {
              console.log(res);
              if (res) {
                this.loadClinics(res);
              }
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "view-doctor * loadDoctorClinicsDetails",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadDoctorClinicsDetails() function returned error." +
                  JSON.stringify(error)
              );
            });
          a.dismiss();
        });
      });
  }

  async loadDoctorModesDetails() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorModesDetails(this.selectedDoctorId)
            .then((res: any[]) => {
              console.log(res);
              if (res) {
                this.loadModes(res);
              }
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "view-doctor * loadDoctorModesDetails",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadDoctorModesDetails() function returned error." +
                  JSON.stringify(error)
              );
            });
          a.dismiss();
        });
      });
  }

  async loadProfile() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService
            .getDoctorProfile(this.selectedDoctorId)
            .subscribe((data) => {
              a.dismiss();
              console.log(data);
              if (this.utilities.isInvalidApiResponseData(data)) {
                this.utilities.presentToastWarning("Something went wrong");
              } else {
                console.log(data[0]);
                console.log(data[0]["name"]);
                if (data[0]) {
                  this.doctorPhoto = data[0]["photo"];
                  this.doctorName = data[0]["name"];
                }
                if (data[1]) {
                  this.loadSpecialisation(data[1]["specialisation"]);
                  this.loadExperience(data[1]["experience"]);
                  this.loadQualifications(data[1]["qualifications"]);
                  this.loadCertifications(data[1]["certifications"]);
                }
                if (data[2]) {
                  this.loadClinics(data[2]);
                }
                if (data[3]) {
                  this.loadModes(data[3]);
                }

                this.utilities.presentToastSuccess("data loaded successfully");
              }
            });
        });
      });
  }

  loadModes(data) {
    data.forEach((data) => {
      // this.modes.push({data})
      if (data.mode_id == 1) {
        this.videoConsultations.push(data);
      } else if (data.mode_id == 2) {
        this.audioConsultations.push(data);
      } else if (data.mode_id == 3) {
        this.chatConsultations.push(data);
      } else if (data.mode_id == 4) {
        this.physicalVisits.push(data);
      }
    });
  }
  loadClinics(data) {
    if (data.length > 0) {
      var dateIds = [];
      var dateNames = [];
      data.forEach((data) => {
        if (data.week_days) {
          dateIds = data.week_days.split(",");
          dateIds.forEach((dateId) => {
            dateNames.push(
              this.dates.find((data) => data.id == +dateId)["day"]
            );
          });
        }

        console.log(dateNames);
        this.clinics.push({
          name: data.clinic_name,
          timings: `${dateNames[0]} - ${dateNames[dateNames.length - 1]}  : ${
            data.from_time
          } to ${data.to_time} `,
          fees: `In clinic fees : $ ${data.walkin_fee}`,
        });
      });
      console.log(this.clinics);
    }
  }
  loadSpecialisation(data) {
    if (data) {
      var specialisationIds = [];
      specialisationIds = data.split(",");
      console.log(specialisationIds);
      this.specialisation = [];
      specialisationIds.forEach((specialisationId) => {
        this.specialisation.push(
          this.specialisationMasters.find(
            (data) => data.id == +specialisationId
          )["name"]
        );

        console.log(specialisationId);
      });

      console.log(this.specialisation);
    }
  }

  loadExperience(data) {
    if (data) {
      this.experience = `${data.toString()}  years experience`;
    }
  }

  loadQualifications(data) {
    if (data) {
      var qualificationIds = [];
      qualificationIds = data.split(",");
      console.log(qualificationIds);
      var qualificationNames = [];
      qualificationIds.forEach((qualificationId) => {
        qualificationNames.push(
          this.qualificationMasters.find((data) => data.id == +qualificationId)[
            "name"
          ]
        );
      });
      this.qualification = qualificationNames.toString();
      console.log(this.qualification);
    }
  }

  loadCertifications(data) {
    if (data) {
      var certicationIds = [];
      certicationIds = data.split(",");
      console.log(certicationIds);
      var certificationNames = [];
      certicationIds.forEach((certicationId) => {
        certificationNames.push(
          this.certificationMasters.find((data) => data.id == +certicationId)[
            "name"
          ]
        );
      });
      this.certification = certificationNames.toString();
      console.log(this.certification);
    }
  }
}
