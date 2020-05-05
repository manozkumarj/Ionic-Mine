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
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/profile/profile.module").then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "doctors",
    loadChildren: () =>
      import("./pages/doctors/doctors.module").then((m) => m.DoctorsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "records",
    loadChildren: () =>
      import("./pages/records/records.module").then((m) => m.RecordsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "family-members",
    loadChildren: () =>
      import("./pages/family-members/family-members.module").then(
        (m) => m.FamilyMembersPageModule
      ),
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
    path: "help-center",
    loadChildren: () =>
      import("./pages/help-center/help-center.module").then(
        (m) => m.HelpCenterPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "homeo-kits/:doctor-id",
    loadChildren: () =>
      import("./pages/homeo-kits/homeo-kits.module").then(
        (m) => m.HomeoKitsPageModule
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
    path: "health-records",
    loadChildren: () =>
      import("./pages/health-records/health-records.module").then(
        (m) => m.HealthRecordsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "appointments",
    loadChildren: () =>
      import("./pages/appointments/appointments.module").then(
        (m) => m.AppointmentsPageModule
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
    path: "appointment-details",
    loadChildren: () =>
      import("./pages/appointment-details/appointment-details.module").then(
        (m) => m.AppointmentDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "appointment-questions/:one/:two/:three/:four",
    loadChildren: () =>
      import("./pages/appointment-questions/appointment-questions.module").then(
        (m) => m.AppointmentQuestionsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "appointment-questions/:one/:two/:three",
    loadChildren: () =>
      import("./pages/appointment-questions/appointment-questions.module").then(
        (m) => m.AppointmentQuestionsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "appointment-questions/:one/:two",
    loadChildren: () =>
      import("./pages/appointment-questions/appointment-questions.module").then(
        (m) => m.AppointmentQuestionsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "appointment-questions/:one",
    loadChildren: () =>
      import("./pages/appointment-questions/appointment-questions.module").then(
        (m) => m.AppointmentQuestionsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "vitals",
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
    path: "medical-history",
    loadChildren: () =>
      import("./pages/medical-history/medical-history.module").then(
        (m) => m.MedicalHistoryPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "lifestyle",
    loadChildren: () =>
      import("./pages/lifestyle/lifestyle.module").then(
        (m) => m.LifestylePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "files",
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
    path: "completed-consultation-details",
    loadChildren: () =>
      import(
        "./pages/completed-consultation-details/completed-consultation-details.module"
      ).then((m) => m.CompletedConsultationDetailsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-file",
    loadChildren: () =>
      import("./pages/edit-file/edit-file.module").then(
        (m) => m.EditFilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "allergies",
    loadChildren: () =>
      import("./pages/allergies/allergies.module").then(
        (m) => m.AllergiesPageModule
      ),
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
    path: "edit-profile/:one/:two/:three/:four/:five/:six/:seven/:eight/:nine",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-profile/:one/:two/:three/:four/:five/:six/:seven/:eight",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-profile/:one/:two/:three/:four/:five/:six/:seven",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-profile/:one/:two/:three/:four/:five/:six",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-profile/:one/:two/:three/:four/:five",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-profile/:one/:two/:three/:four",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-profile/:one/:two/:three",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-profile/:one/:two",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-profile/:one",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "multi-selection",
    loadChildren: () =>
      import("./pages/multi-selection/multi-selection.module").then(
        (m) => m.MultiSelectionPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-lifestyle/:one/:two/:three/:four/:five/:six/:seven",
    loadChildren: () =>
      import("./pages/edit-lifestyle/edit-lifestyle.module").then(
        (m) => m.EditLifestylePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-lifestyle/:one/:two/:three/:four/:five/:six",
    loadChildren: () =>
      import("./pages/edit-lifestyle/edit-lifestyle.module").then(
        (m) => m.EditLifestylePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-lifestyle/:one/:two/:three/:four/:five",
    loadChildren: () =>
      import("./pages/edit-lifestyle/edit-lifestyle.module").then(
        (m) => m.EditLifestylePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-lifestyle/:one/:two/:three/:four",
    loadChildren: () =>
      import("./pages/edit-lifestyle/edit-lifestyle.module").then(
        (m) => m.EditLifestylePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-lifestyle/:one/:two/:three",
    loadChildren: () =>
      import("./pages/edit-lifestyle/edit-lifestyle.module").then(
        (m) => m.EditLifestylePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-lifestyle/:one/:two",
    loadChildren: () =>
      import("./pages/edit-lifestyle/edit-lifestyle.module").then(
        (m) => m.EditLifestylePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-lifestyle/:one",
    loadChildren: () =>
      import("./pages/edit-lifestyle/edit-lifestyle.module").then(
        (m) => m.EditLifestylePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "medical-history-relations",
    loadChildren: () =>
      import(
        "./pages/medical-history-relations/medical-history-relations.module"
      ).then((m) => m.MedicalHistoryRelationsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "edit-relation-medical-history",
    loadChildren: () =>
      import(
        "./pages/edit-relation-medical-history/edit-relation-medical-history.module"
      ).then((m) => m.EditRelationMedicalHistoryPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "add-relative",
    loadChildren: () =>
      import("./pages/add-relative/add-relative.module").then(
        (m) => m.AddRelativePageModule
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
