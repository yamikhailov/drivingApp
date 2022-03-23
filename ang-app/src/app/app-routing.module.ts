import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './sections/home/home.component';
import { PackagesComponent } from './sections/packages/packages.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'packages', component: PackagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
