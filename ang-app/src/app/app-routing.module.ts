import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './sections/auth/login/login.component';
import { RegisterComponent } from './sections/auth/register/register.component';
import { HomeComponent } from './sections/home/home.component';
import { PackagesComponent } from './sections/packages/packages.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ProfileViewComponent } from './sections/profile-view/profile-view.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'packages', component: PackagesComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'profile/:username', component: ProfileViewComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
