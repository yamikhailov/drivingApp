import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './sections/auth/login/login.component';
import { RegisterComponent } from './sections/auth/register/register.component';
import { HomeComponent } from './sections/home/home.component';
//import { PackagesComponent } from './sections/packages/packages.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ProfileViewComponent } from './sections/profile-view/profile-view.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'profile/:username', component: ProfileViewComponent, canActivate: [AuthGuard]},
  {path: 'packages', loadChildren: () => import('./sections/package/package.module').then(m => m.PackageModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
