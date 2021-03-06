import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { PackagesCartComponent } from './packages-cart/packages-cart.component';
import { PackagesCartCalculatorComponent } from './packages-cart-calculator/packages-cart-calculator.component';
import { PackagesComponent } from './packages/packages.component';

@NgModule({
  declarations: [
    PackagesComponent,
    PackagesCartComponent,
    PackagesCartCalculatorComponent
  ],
  imports: [
    CommonModule,
    PackageRoutingModule
  ]
})
export class PackageModule { }
