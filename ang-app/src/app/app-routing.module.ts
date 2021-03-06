import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './sections/auth/login/login.component';
import { RegisterComponent } from './sections/auth/register/register.component';
import { HomeComponent } from './sections/home/home.component';
//import { PackagesComponent } from './sections/packages/packages.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ProfileViewComponent } from './sections/profile-view/profile-view.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';
import { SettingsComponent } from './sections/settings/settings.component';
import { SuccessComponent } from './sections/payment/success/success.component';
import { FailComponent } from './sections/payment/fail/fail.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'profile/:username', component: ProfileViewComponent, canActivate: [AuthGuard]},
  {path: 'packages', loadChildren: () => import('./sections/package/package.module').then(m => m.PackageModule)},
  {path: 'courses', loadChildren: () => import('./sections/course/course.module').then(m => m.CourseModule)},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'payment/success', component: SuccessComponent, canActivate: [AuthGuard]},
  {path: 'payment/fail', component: FailComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
