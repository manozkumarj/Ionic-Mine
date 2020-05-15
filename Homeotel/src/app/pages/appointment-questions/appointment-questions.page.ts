import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-appointment-questions",
  templateUrl: "./appointment-questions.page.html",
  styleUrls: ["./appointment-questions.page.scss"],
})
export class AppointmentQuestionsPage implements OnInit {
  currentQuestion;

  enteredDescription = null;

  title;
  backwardLink;
  forwardLink;
  question;

  isRecurring;
  recurringFreq;
  severity;
  description;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private utilities: UtilitiesService
  ) {
    console.log("selectedAppointmentComplaintDetails is below");
    console.log(this.utilities.selectedAppointmentComplaintDetails);

    this.isRecurring = this.utilities.selectedAppointmentComplaintDetails[
      "is_recurring"
    ];
    this.recurringFreq = this.utilities.selectedAppointmentComplaintDetails[
      "recurring_freq"
    ];
    this.severity = this.utilities.selectedAppointmentComplaintDetails[
      "severity_id"
    ];
    this.description = this.utilities.selectedAppointmentComplaintDetails[
      "complaint_description"
    ];
  }

  ngOnInit() {
    this.currentQuestion = null;
    let paramOne = parseInt(this.activatedRoute.snapshot.paramMap.get("one"));
    let paramTwo = parseInt(this.activatedRoute.snapshot.paramMap.get("two"));
    let paramThree = parseInt(
      this.activatedRoute.snapshot.paramMap.get("three")
    );
    let paramFour = parseInt(this.activatedRoute.snapshot.paramMap.get("four"));

    if (paramFour) {
      console.log("paramFour");
      this.title = `${paramFour} of 4`;
      this.backwardLink = `/appointment-questions/1/2/3`;
      this.forwardLink = `/appointments`;
      this.question = "Description of the pain?";
      this.currentQuestion = "four";
    } else if (paramThree) {
      console.log("paramThree");
      this.title = `${paramThree} of 4`;
      this.backwardLink = `/appointment-questions/1/2`;
      this.forwardLink = `/appointment-questions/1/2/3/4`;
      this.question = "Aggravated by?";
      this.currentQuestion = "three";
    } else if (paramTwo) {
      console.log("paramTwo");
      this.title = `${paramTwo} of 4`;
      this.backwardLink = `/appointment-questions/1`;
      this.forwardLink = `/appointment-questions/1/2/3`;
      this.currentQuestion = "two";
      this.question = "Recurring every?";
    } else if (paramOne) {
      console.log("paramOne");
      this.title = `${paramOne} of 4`;
      this.backwardLink = `/appointments`;
      this.forwardLink = `/appointment-questions/1/2`;
      this.question = "Is your complaint recurring?";
      this.currentQuestion = "one";
    }
  }

  answered = (ansId) => {
    console.log("ansId -> " + ansId);
    if (this.currentQuestion == "one") {
      this.isRecurring = this.utilities.selectedAppointmentComplaintDetails[
        "is_recurring"
      ] = ansId;
      if (ansId == 2) {
        this.utilities.selectedAppointmentComplaintDetails[
          "recurring_freq"
        ] = 0;
      }
    } else if (this.currentQuestion == "two") {
      this.recurringFreq = this.utilities.selectedAppointmentComplaintDetails[
        "recurring_freq"
      ] = ansId;
    } else if (this.currentQuestion == "three") {
      this.recurringFreq = this.utilities.selectedAppointmentComplaintDetails[
        "severity_id"
      ] = ansId;
    } else if (this.currentQuestion == "four") {
      this.description = this.utilities.selectedAppointmentComplaintDetails[
        "complaint_description"
      ] = this.description;

      console.log("enteredDescription -> " + this.description);
    }

    this.apiService
      .upsertComplaintDetails(
        this.utilities.selectedAppointmentComplaintDetails["appointment_id"],
        this.utilities.selectedAppointmentComplaintDetails["doctor_id"],
        this.utilities.selectedAppointmentComplaintDetails["relative_id"],
        this.utilities.selectedAppointmentComplaintDetails["is_recurring"],
        this.utilities.selectedAppointmentComplaintDetails["recurring_freq"],
        this.utilities.selectedAppointmentComplaintDetails["severity_id"],
        this.utilities.selectedAppointmentComplaintDetails[
          "complaint_description"
        ]
      )
      .subscribe((data) => {
        console.log("Returned from Backend");
        console.log(JSON.stringify(data));
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log("Returned Error");
          console.log(data[0][0]);
          if (data[0][0]["error"]) {
            console.log("Something went wrong");
          }
        } else {
          console.log("Returned Success");
        }
      });
    if (this.currentQuestion == "four")
      this.utilities.presentToastSuccess("Updated successfully.");
    if (this.currentQuestion == "one" && ansId == 2)
      this.router.navigate(["/appointment-questions/1/2/3"]);
    this.router.navigate([this.forwardLink]);
  };
}
