import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesCartComponent } from './packages-cart/packages-cart.component';
import { PackagesComponent } from './packages/packages.component';
const routes: Routes = [
  {path: '', component: PackagesComponent},
  {path: 'cart', component: PackagesCartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
