import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "initialization", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "initialization",
    loadChildren: () =>
      import("./pages/initialization/initialization.module").then(
        (m) => m.InitializationPageModule
      ),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/profile/profile.module").then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },

  {
    path: "view-doctor/:id",
    loadChildren: () =>
      import("./pages/view-doctor/view-doctor.module").then(
        (m) => m.ViewDoctorPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./pages/settings/settings.module").then(
        (m) => m.SettingsPageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "edit-doctor-profile",
    loadChildren: () =>
      import("./pages/edit-doctor-profile/edit-doctor-profile.module").then(
        (m) => m.EditDoctorProfilePageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "doctor-personal",
    loadChildren: () =>
      import("./pages/doctor-personal/doctor-personal.module").then(
        (m) => m.DoctorPersonalPageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "doctor-professional",
    loadChildren: () =>
      import("./pages/doctor-professional/doctor-professional.module").then(
        (m) => m.DoctorProfessionalPageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "doctor-clinics",
    loadChildren: () =>
      import("./pages/doctor-clinics/doctor-clinics.module").then(
        (m) => m.DoctorClinicsPageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "clinic-details",
    loadChildren: () =>
      import("./pages/clinic-details/clinic-details.module").then(
        (m) => m.ClinicDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "doctor-consultation-modes",
    loadChildren: () =>
      import(
        "./pages/doctor-consultation-modes/doctor-consultation-modes.module"
      ).then((m) => m.DoctorConsultationModesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "consultation-type/:id",
    loadChildren: () =>
      import("./pages/consultation-type/consultation-type.module").then(
        (m) => m.ConsultationTypePageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "help-center",
    loadChildren: () =>
      import("./pages/help-center/help-center.module").then(
        (m) => m.HelpCenterPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "homeo-kits",
    loadChildren: () =>
      import("./pages/homeo-kits/homeo-kits.module").then(
        (m) => m.HomeoKitsPageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "kit-details/:type",
    loadChildren: () =>
      import("./pages/kit-details/kit-details.module").then(
        (m) => m.KitDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "kit-details/:type/:id",
    loadChildren: () =>
      import("./pages/kit-details/kit-details.module").then(
        (m) => m.KitDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "health-records/:userId/:relativeId",
    loadChildren: () =>
      import("./pages/health-records/health-records.module").then(
        (m) => m.HealthRecordsPageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "payments/:id",
    loadChildren: () =>
      import("./pages/payments/payments.module").then(
        (m) => m.PaymentsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "payments",
    loadChildren: () =>
      import("./pages/payments/payments.module").then(
        (m) => m.PaymentsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "my-doctors",
    loadChildren: () =>
      import("./pages/my-doctors/my-doctors.module").then(
        (m) => m.MyDoctorsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "modal",
    loadChildren: () =>
      import("./pages/modal/modal.module").then((m) => m.ModalPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "payment-gateways",
    loadChildren: () =>
      import("./pages/payment-gateways/payment-gateways.module").then(
        (m) => m.PaymentGatewaysPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "slot-selection",
    loadChildren: () =>
      import("./pages/slot-selection/slot-selection.module").then(
        (m) => m.SlotSelectionPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "add-patients",
    loadChildren: () =>
      import("./pages/add-patients/add-patients.module").then(
        (m) => m.AddPatientsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "today-queue",
    loadChildren: () =>
      import("./pages/today-queue/today-queue.module").then(
        (m) => m.TodayQueuePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "scheduled-appointments",
    loadChildren: () =>
      import(
        "./pages/scheduled-appointments/scheduled-appointments.module"
      ).then((m) => m.ScheduledAppointmentsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "consultation-details",
    loadChildren: () =>
      import("./pages/consultation-details/consultation-details.module").then(
        (m) => m.ConsultationDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "issue-details/:id",
    loadChildren: () =>
      import("./pages/issue-details/issue-details.module").then(
        (m) => m.IssueDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "appointment-details/:appointmentId",
    loadChildren: () =>
      import("./pages/appointment-details/appointment-details.module").then(
        (m) => m.AppointmentDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "vitals/:userId/:relativeId",
    loadChildren: () =>
      import("./pages/vitals/vitals.module").then((m) => m.VitalsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "vital-questions/:one/:two/:three/:four",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        (m) => m.VitalQuestionsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "vital-questions/:one/:two/:three",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        (m) => m.VitalQuestionsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "vital-questions/:one/:two",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        (m) => m.VitalQuestionsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "vital-questions/:one",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        (m) => m.VitalQuestionsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "medical-history/:userId/:relativeId",
    loadChildren: () =>
      import("./pages/medical-history/medical-history.module").then(
        (m) => m.MedicalHistoryPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "lifestyle/:userId/:relativeId",
    loadChildren: () =>
      import("./pages/lifestyle/lifestyle.module").then(
        (m) => m.LifestylePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "files/:userId/:relativeId",
    loadChildren: () =>
      import("./pages/files/files.module").then((m) => m.FilesPageModule),
    canActivate: [AuthGuard],
  },

  {
    path: "previous-consultations",
    loadChildren: () =>
      import(
        "./pages/previous-consultations/previous-consultations.module"
      ).then((m) => m.PreviousConsultationsPageModule),
    canActivate: [AuthGuard],
  },

  {
    path: "previous-consultations/:userId/:relativeId",
    loadChildren: () =>
      import(
        "./pages/previous-consultations/previous-consultations.module"
      ).then((m) => m.PreviousConsultationsPageModule),
  },
  {
    path: "completed-consultation-details/:userId/:relativeId",
    loadChildren: () =>
      import(
        "./pages/completed-consultation-details/completed-consultation-details.module"
      ).then((m) => m.CompletedConsultationDetailsPageModule),
    canActivate: [AuthGuard],
  },

  {
    path: "single-selection",
    loadChildren: () =>
      import("./pages/single-selection/single-selection.module").then(
        (m) => m.SingleSelectionPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "add-patients",
    loadChildren: () =>
      import("./pages/add-patients/add-patients.module").then(
        (m) => m.AddPatientsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "today-queue",
    loadChildren: () =>
      import("./pages/today-queue/today-queue.module").then(
        (m) => m.TodayQueuePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "scheduled-appointments",
    loadChildren: () =>
      import(
        "./pages/scheduled-appointments/scheduled-appointments.module"
      ).then((m) => m.ScheduledAppointmentsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "doctor-personal",
    loadChildren: () =>
      import("./pages/doctor-personal/doctor-personal.module").then(
        (m) => m.DoctorPersonalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "doctor-professional",
    loadChildren: () =>
      import("./pages/doctor-professional/doctor-professional.module").then(
        (m) => m.DoctorProfessionalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "doctor-clinics",
    loadChildren: () =>
      import("./pages/doctor-clinics/doctor-clinics.module").then(
        (m) => m.DoctorClinicsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "doctor-consultation-modes",
    loadChildren: () =>
      import(
        "./pages/doctor-consultation-modes/doctor-consultation-modes.module"
      ).then((m) => m.DoctorConsultationModesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "clinic-details/:type",
    loadChildren: () =>
      import("./pages/clinic-details/clinic-details.module").then(
        (m) => m.ClinicDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "clinic-details/:type/:id",
    loadChildren: () =>
      import("./pages/clinic-details/clinic-details.module").then(
        (m) => m.ClinicDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "consultation-type",
    loadChildren: () =>
      import("./pages/consultation-type/consultation-type.module").then(
        (m) => m.ConsultationTypePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "kit-details",
    loadChildren: () =>
      import("./pages/kit-details/kit-details.module").then(
        (m) => m.KitDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "user-consultation-details/:userId/:relativeId",
    loadChildren: () =>
      import(
        "./pages/user-consultation-details/user-consultation-details.module"
      ).then((m) => m.UserConsultationDetailsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-personal/:questionNumber",
    loadChildren: () =>
      import("./pages/edit-personal/edit-personal.module").then(
        (m) => m.EditPersonalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-personal/1/:questionNumber",
    loadChildren: () =>
      import("./pages/edit-personal/edit-personal.module").then(
        (m) => m.EditPersonalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-personal/1/2/:questionNumber",
    loadChildren: () =>
      import("./pages/edit-personal/edit-personal.module").then(
        (m) => m.EditPersonalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-personal/1/2/3/:questionNumber",
    loadChildren: () =>
      import("./pages/edit-personal/edit-personal.module").then(
        (m) => m.EditPersonalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-personal/1/2/3/4/:questionNumber",
    loadChildren: () =>
      import("./pages/edit-personal/edit-personal.module").then(
        (m) => m.EditPersonalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-professional/:questionNumber",
    loadChildren: () =>
      import("./pages/edit-professional/edit-professional.module").then(
        (m) => m.EditProfessionalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-professional/1/:questionNumber",
    loadChildren: () =>
      import("./pages/edit-professional/edit-professional.module").then(
        (m) => m.EditProfessionalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-professional/1/2/:questionNumber",
    loadChildren: () =>
      import("./pages/edit-professional/edit-professional.module").then(
        (m) => m.EditProfessionalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-professional/1/2/3/:questionNumber",
    loadChildren: () =>
      import("./pages/edit-professional/edit-professional.module").then(
        (m) => m.EditProfessionalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-professional/1/2/3/4/:questionNumber",
    loadChildren: () =>
      import("./pages/edit-professional/edit-professional.module").then(
        (m) => m.EditProfessionalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "diagnosis/:appointmentId",
    loadChildren: () =>
      import("./pages/diagnosis/diagnosis.module").then(
        (m) => m.DiagnosisPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "prescription/:appointmentId",
    loadChildren: () =>
      import("./pages/prescription/prescription.module").then(
        (m) => m.PrescriptionPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-diagnosis/:type",
    loadChildren: () =>
      import("./pages/edit-diagnosis/edit-diagnosis.module").then(
        (m) => m.EditDiagnosisPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-diagnosis/1/:type",
    loadChildren: () =>
      import("./pages/edit-diagnosis/edit-diagnosis.module").then(
        (m) => m.EditDiagnosisPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-diagnosis/1/2/:type",
    loadChildren: () =>
      import("./pages/edit-diagnosis/edit-diagnosis.module").then(
        (m) => m.EditDiagnosisPageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: "edit-prescription/:type",
    loadChildren: () =>
      import("./pages/edit-prescription/edit-prescription.module").then(
        (m) => m.EditPrescriptionPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-prescription/1/:type",
    loadChildren: () =>
      import("./pages/edit-prescription/edit-prescription.module").then(
        (m) => m.EditPrescriptionPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-prescription/1/2/:type",
    loadChildren: () =>
      import("./pages/edit-prescription/edit-prescription.module").then(
        (m) => m.EditPrescriptionPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-prescription/1/2/3/:type",
    loadChildren: () =>
      import("./pages/edit-prescription/edit-prescription.module").then(
        (m) => m.EditPrescriptionPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-prescription/1/2/3/4/:type",
    loadChildren: () =>
      import("./pages/edit-prescription/edit-prescription.module").then(
        (m) => m.EditPrescriptionPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "view-file/:fileId",
    loadChildren: () =>
      import("./pages/view-file/view-file.module").then(
        (m) => m.ViewFilePageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
