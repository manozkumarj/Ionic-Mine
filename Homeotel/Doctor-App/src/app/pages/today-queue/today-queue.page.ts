import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common.service";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-today-queue",
  templateUrl: "./today-queue.page.html",
  styleUrls: ["./today-queue.page.scss"]
})
export class TodayQueuePage implements OnInit {
  selectedTab = 1;
  upComingConsultations = [];
  completedConsultations = [];

  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
    //    this.loadTodayQueue();
  }

  ionViewWillEnter() {
    this.loadTodayQueue();
  }

  togglingTabs(tab) {
    this.selectedTab = tab;
  }

  loadTodayQueue() {
    this.apiService
      .getTodayQueue(this.commonService.currentDoctorId)
      .subscribe(data => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.upComingConsultations = [];
          data[0].forEach(data => {
            var displayName;
            if (data.relative_id == 0) {
              displayName = data.user_name;
            } else {
              displayName = data.relative_name;
            }
            this.upComingConsultations.push({
              userId: data.user_id,
              relativeId: data.relative_id,
              displayName: displayName,
              appointmentAt: data.appointment_at,
              doctorName: data.doctor_name,
              byName : data.user_name,
              mode: data.mode,
              photo : data.photo
            });
          });

          this.completedConsultations = [];
          data[1].forEach(data => {
            var displayName;
            if (data.relative_id == 0) {
              displayName = data.user_name;
            } else {
              displayName = data.relative_name;
            }
            this.completedConsultations.push({
              userId: data.user_id,
              relativeId: data.relative_id,
              displayName: displayName,
              appointmentAt: data.appointment_at,
              doctorName: data.doctor_name,
              byName : data.user_name,
              mode: data.mode,
              photo : data.photo
            });
          });
          console.log(this.upComingConsultations);
          console.log(this.completedConsultations);
          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
  }
}
