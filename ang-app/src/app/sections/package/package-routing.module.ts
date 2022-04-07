import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesCartComponent } from './packages-cart/packages-cart.component';

const routes: Routes = [
  {path: '', component: PackagesCartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
