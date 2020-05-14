import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "initialization", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "initialization",
    loadChildren: () =>
      import("./pages/initialization/initialization.module").then(
        m => m.InitializationPageModule
      )
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/profile/profile.module").then(m => m.ProfilePageModule)
  },
 
 
 
  {
    path: "view-doctor/:id",
    loadChildren: () =>
      import("./pages/view-doctor/view-doctor.module").then(
        m => m.ViewDoctorPageModule
      )
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./pages/settings/settings.module").then(m => m.SettingsPageModule)
  },

  {
    path: "edit-doctor-profile",
    loadChildren: () =>
      import("./pages/edit-doctor-profile/edit-doctor-profile.module").then(m => m.EditDoctorProfilePageModule)
  },

  {
    path: "doctor-personal",
    loadChildren: () =>
      import("./pages/doctor-personal/doctor-personal.module").then(m => m.DoctorPersonalPageModule)
  },

  
  {
    path: "doctor-professional",
    loadChildren: () =>
      import("./pages/doctor-professional/doctor-professional.module").then(m => m.DoctorProfessionalPageModule)
  },

  {
    path: "doctor-clinics",
    loadChildren: () =>
      import("./pages/doctor-clinics/doctor-clinics.module").then(m => m.DoctorClinicsPageModule)
  },

  {
    path: "clinic-details",
    loadChildren: () =>
      import("./pages/clinic-details/clinic-details.module").then(m => m.ClinicDetailsPageModule)
  },

  {
    path: "doctor-consultation-modes",
    loadChildren: () =>
      import("./pages/doctor-consultation-modes/doctor-consultation-modes.module").then(m => m.DoctorConsultationModesPageModule)
  },
  {
    path: "consultation-type/:id",
    loadChildren: () =>
      import("./pages/consultation-type/consultation-type.module").then(m => m.ConsultationTypePageModule)
  },

  {
    path: "help-center",
    loadChildren: () =>
      import("./pages/help-center/help-center.module").then(
        m => m.HelpCenterPageModule
      )
  },
  {
    path: "homeo-kits",
    loadChildren: () =>
      import("./pages/homeo-kits/homeo-kits.module").then(
        m => m.HomeoKitsPageModule
      )
  },

  {
    path: "kit-details/:type",
    loadChildren: () =>
      import("./pages/kit-details/kit-details.module").then(
        m => m.KitDetailsPageModule
      )
  },


  {
    path: "kit-details/:type/:id",
    loadChildren: () =>
      import("./pages/kit-details/kit-details.module").then(
        m => m.KitDetailsPageModule
      )
  },
  {
    path: "health-records/:userId/:relativeId",
    loadChildren: () =>
      import("./pages/health-records/health-records.module").then(
        m => m.HealthRecordsPageModule
      )
  },

  {
    path: "payments/:id",
    loadChildren: () =>
      import("./pages/payments/payments.module").then(m => m.PaymentsPageModule)
  },
  {
    path: "payments",
    loadChildren: () =>
      import("./pages/payments/payments.module").then(m => m.PaymentsPageModule)
  },
  {
    path: "my-doctors",
    loadChildren: () =>
      import("./pages/my-doctors/my-doctors.module").then(
        m => m.MyDoctorsPageModule
      )
  },
  {
    path: "modal",
    loadChildren: () =>
      import("./pages/modal/modal.module").then(m => m.ModalPageModule)
  },
  {
    path: "payment-gateways",
    loadChildren: () =>
      import("./pages/payment-gateways/payment-gateways.module").then(
        m => m.PaymentGatewaysPageModule
      )
  },
  {
    path: "slot-selection",
    loadChildren: () =>
      import("./pages/slot-selection/slot-selection.module").then(
        m => m.SlotSelectionPageModule
      )
  },
  {
    path: "add-patients",
    loadChildren: () =>
      import("./pages/add-patients/add-patients.module").then(
        m => m.AddPatientsPageModule
      )
  },
  {
    path: "today-queue",
    loadChildren: () =>
      import("./pages/today-queue/today-queue.module").then(
        m => m.TodayQueuePageModule
      )
  },
  {
    path: "scheduled-appointments",
    loadChildren: () =>
      import("./pages/scheduled-appointments/scheduled-appointments.module").then(
        m => m.ScheduledAppointmentsPageModule
      )
  },
  {
    path: "consultation-details",
    loadChildren: () =>
      import("./pages/consultation-details/consultation-details.module").then(
        m => m.ConsultationDetailsPageModule
      )
  },
  {
    path: "issue-details/:id",
    loadChildren: () =>
      import("./pages/issue-details/issue-details.module").then(
        m => m.IssueDetailsPageModule
      )
  },
  {
    path: "appointment-details/:appointmentId",
    loadChildren: () =>
      import("./pages/appointment-details/appointment-details.module").then(
        m => m.AppointmentDetailsPageModule
      )
  },
 
  {
    path: "vitals/:userId/:relativeId",
    loadChildren: () =>
      import("./pages/vitals/vitals.module").then(m => m.VitalsPageModule)
  },
  {
    path: "vital-questions/:one/:two/:three/:four",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        m => m.VitalQuestionsPageModule
      )
  },
  {
    path: "vital-questions/:one/:two/:three",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        m => m.VitalQuestionsPageModule
      )
  },
  {
    path: "vital-questions/:one/:two",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        m => m.VitalQuestionsPageModule
      )
  },
  {
    path: "vital-questions/:one",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        m => m.VitalQuestionsPageModule
      )
  },
  {
    path: "medical-history/:userId/:relativeId",
    loadChildren: () =>
      import("./pages/medical-history/medical-history.module").then(
        m => m.MedicalHistoryPageModule
      )
  },
  {
    path: "lifestyle/:userId/:relativeId",
    loadChildren: () =>
      import("./pages/lifestyle/lifestyle.module").then(
        m => m.LifestylePageModule
      )
  },
  {
    path: "files/:userId/:relativeId",
    loadChildren: () =>
      import("./pages/files/files.module").then(m => m.FilesPageModule)
  },

  {
    path: "previous-consultations",
    loadChildren: () =>
      import(
        "./pages/previous-consultations/previous-consultations.module"
      ).then(m => m.PreviousConsultationsPageModule)
  },
 
  {
    path: "previous-consultations/:userId/:relativeId",
    loadChildren: () =>
      import(
        "./pages/previous-consultations/previous-consultations.module"
      ).then(m => m.PreviousConsultationsPageModule)
  },
  {
    path: 'completed-consultation-details/:userId/:relativeId',
    loadChildren: () => import('./pages/completed-consultation-details/completed-consultation-details.module').then( m => m.CompletedConsultationDetailsPageModule)
  },
 
  
  {
    path: 'single-selection',
    loadChildren: () => import('./pages/single-selection/single-selection.module').then( m => m.SingleSelectionPageModule)
  },
  {
    path: 'add-patients',
    loadChildren: () => import('./pages/add-patients/add-patients.module').then( m => m.AddPatientsPageModule)
  },
  {
    path: 'today-queue',
    loadChildren: () => import('./pages/today-queue/today-queue.module').then( m => m.TodayQueuePageModule)
  },
  {
    path: 'scheduled-appointments',
    loadChildren: () => import('./pages/scheduled-appointments/scheduled-appointments.module').then( m => m.ScheduledAppointmentsPageModule)
  },
  {
    path: 'doctor-personal',
    loadChildren: () => import('./pages/doctor-personal/doctor-personal.module').then( m => m.DoctorPersonalPageModule)
  },
  {
    path: 'doctor-professional',
    loadChildren: () => import('./pages/doctor-professional/doctor-professional.module').then( m => m.DoctorProfessionalPageModule)
  },
  {
    path: 'doctor-clinics',
    loadChildren: () => import('./pages/doctor-clinics/doctor-clinics.module').then( m => m.DoctorClinicsPageModule)
  },
  {
    path: 'doctor-consultation-modes',
    loadChildren: () => import('./pages/doctor-consultation-modes/doctor-consultation-modes.module').then( m => m.DoctorConsultationModesPageModule)
  },
  {
    path: 'clinic-details/:type',
    loadChildren: () => import('./pages/clinic-details/clinic-details.module').then( m => m.ClinicDetailsPageModule)
  },
  {
    path: 'clinic-details/:type/:id',
    loadChildren: () => import('./pages/clinic-details/clinic-details.module').then( m => m.ClinicDetailsPageModule)
  },
  {
    path: 'consultation-type',
    loadChildren: () => import('./pages/consultation-type/consultation-type.module').then( m => m.ConsultationTypePageModule)
  },
  {
    path: 'kit-details',
    loadChildren: () => import('./pages/kit-details/kit-details.module').then( m => m.KitDetailsPageModule)
  },
  {
    path: 'user-consultation-details/:userId/:relativeId',
    loadChildren: () => import('./pages/user-consultation-details/user-consultation-details.module').then( m => m.PatientConsultationDetailsPageModule)
  },
  {
    path: 'edit-personal/:questionNumber',
    loadChildren: () => import('./pages/edit-personal/edit-personal.module').then( m => m.EditPersonalPageModule)
  },
  {
    path: 'edit-personal/1/:questionNumber',
    loadChildren: () => import('./pages/edit-personal/edit-personal.module').then( m => m.EditPersonalPageModule)
  },
  {
    path: 'edit-personal/1/2/:questionNumber',
    loadChildren: () => import('./pages/edit-personal/edit-personal.module').then( m => m.EditPersonalPageModule)
  },
  {
    path: 'edit-personal/1/2/3/:questionNumber',
    loadChildren: () => import('./pages/edit-personal/edit-personal.module').then( m => m.EditPersonalPageModule)
  },
  {
    path: 'edit-personal/1/2/3/4/:questionNumber',
    loadChildren: () => import('./pages/edit-personal/edit-personal.module').then( m => m.EditPersonalPageModule)
  },
  {
    path: 'edit-professional/:questionNumber',
    loadChildren: () => import('./pages/edit-professional/edit-professional.module').then( m => m.EditProfessionalPageModule)
  },
  {
    path: 'edit-professional/1/:questionNumber',
    loadChildren: () => import('./pages/edit-professional/edit-professional.module').then( m => m.EditProfessionalPageModule)
  },
  {
    path: 'edit-professional/1/2/:questionNumber',
    loadChildren: () => import('./pages/edit-professional/edit-professional.module').then( m => m.EditProfessionalPageModule)
  },
  {
    path: 'edit-professional/1/2/3/:questionNumber',
    loadChildren: () => import('./pages/edit-professional/edit-professional.module').then( m => m.EditProfessionalPageModule)
  },
  {
    path: 'edit-professional/1/2/3/4/:questionNumber',
    loadChildren: () => import('./pages/edit-professional/edit-professional.module').then( m => m.EditProfessionalPageModule)
  },
  {
    path: 'diagnosis/:appointmentId',
    loadChildren: () => import('./pages/diagnosis/diagnosis.module').then( m => m.DiagnosisPageModule)
  },
  {
    path: 'prescription/:appointmentId',
    loadChildren: () => import('./pages/prescription/prescription.module').then( m => m.PrescriptionPageModule)
  },
  {
    path: 'edit-diagnosis/:type',
    loadChildren: () => import('./pages/edit-diagnosis/edit-diagnosis.module').then( m => m.EditDiagnosisPageModule)
  },
  {
    path: 'edit-diagnosis/1/:type',
    loadChildren: () => import('./pages/edit-diagnosis/edit-diagnosis.module').then( m => m.EditDiagnosisPageModule)
  },
  {
    path: 'edit-diagnosis/1/2/:type',
    loadChildren: () => import('./pages/edit-diagnosis/edit-diagnosis.module').then( m => m.EditDiagnosisPageModule)
  },
 
  {
    path: 'edit-prescription/:type',
    loadChildren: () => import('./pages/edit-prescription/edit-prescription.module').then( m => m.EditPrescriptionPageModule)
  },
  {
    path: 'edit-prescription/1/:type',
    loadChildren: () => import('./pages/edit-prescription/edit-prescription.module').then( m => m.EditPrescriptionPageModule)
  },
  {
    path: 'edit-prescription/1/2/:type',
    loadChildren: () => import('./pages/edit-prescription/edit-prescription.module').then( m => m.EditPrescriptionPageModule)
  },
  {
    path: 'edit-prescription/1/2/3/:type',
    loadChildren: () => import('./pages/edit-prescription/edit-prescription.module').then( m => m.EditPrescriptionPageModule)
  },
  {
    path: 'edit-prescription/1/2/3/4/:type',
    loadChildren: () => import('./pages/edit-prescription/edit-prescription.module').then( m => m.EditPrescriptionPageModule)
  },
  {
    path: 'view-file/:fileId',
    loadChildren: () => import('./pages/view-file/view-file.module').then( m => m.ViewFilePageModule)
  },






  

  




  




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
