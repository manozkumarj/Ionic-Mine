import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule"
  },
  {
    path: "all-developers",
    loadChildren: "./pages/all-developers/all-developers.module#AllDevelopersPageModule"
  },
  {
    path: "all-developers/:done",
    loadChildren: "./pages/all-developers/all-developers.module#AllDevelopersPageModule"
  },
  {
    path: "add-developer",
    loadChildren: "./pages/add-developer/add-developer.module#AddDeveloperPageModule"
  },
  {
    path: "view-developer/:id",
    loadChildren: './pages/view-developer/view-developer.module#ViewDeveloperPageModule'
  },
  {
    path: "edit-developer/:id",
    loadChildren: "./pages/edit-developer/edit-developer.module#EditDeveloperPageModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
