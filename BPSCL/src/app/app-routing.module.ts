import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "list",
    loadChildren: () => import("./list/list.module").then(m => m.ListPageModule)
  },
  {
    path: "admin-registration",
    loadChildren: () =>
      import("./pages/admin-registration/admin-registration.module").then(
        m => m.AdminRegistrationPageModule
      )
  },
  {
    path: "beneficiary-registration",
    loadChildren: () =>
      import(
        "./pages/beneficiary-registration/beneficiary-registration.module"
      ).then(m => m.BeneficiaryRegistrationPageModule)
  },  {
    path: 'vitals',
    loadChildren: () => import('./pages/vitals/vitals.module').then( m => m.VitalsPageModule)
  },
  {
    path: 'doctor',
    loadChildren: () => import('./pages/doctor/doctor.module').then( m => m.DoctorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'session-selection',
    loadChildren: () => import('./pages/session-selection/session-selection.module').then( m => m.SessionSelectionPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
