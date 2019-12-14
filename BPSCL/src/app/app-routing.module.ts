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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
