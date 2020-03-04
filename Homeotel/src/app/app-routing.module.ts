import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'initialization', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'initialization',
    loadChildren: () => import('./pages/initialization/initialization.module').then(m => m.InitializationPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'doctors',
    loadChildren: () => import('./pages/doctors/doctors.module').then(m => m.DoctorsPageModule)
  },
  {
    path: 'records',
    loadChildren: () => import('./pages/records/records.module').then(m => m.RecordsPageModule)
  },
  {
    path: 'family-members',
    loadChildren: () => import('./pages/family-members/family-members.module').then(m => m.FamilyMembersPageModule)
  },
  {
    path: 'view-doctor/:id',
    loadChildren: () => import('./pages/view-doctor/view-doctor.module').then(m => m.ViewDoctorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
