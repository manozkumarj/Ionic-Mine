import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "all-developers",
    loadChildren: () =>
      import("./pages/all-developers/all-developers.module").then(
        m => m.AllDevelopersPageModule
      )
  },
  {
    path: "add-developer",
    loadChildren: () =>
      import("./pages/add-developer/add-developer.module").then(
        m => m.AddDeveloperPageModule
      )
  },
  {
    path: "view-developer/:id",
    loadChildren: () =>
      import("./pages/view-developer/view-developer.module").then(
        m => m.ViewDeveloperPageModule
      )
  },
  {
    path: "edit-developer",
    loadChildren: () =>
      import("./pages/edit-developer/edit-developer.module").then(
        m => m.EditDeveloperPageModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
