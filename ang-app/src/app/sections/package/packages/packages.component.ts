import { Component, OnInit } from '@angular/core';
import { packages } from '../mock-packages';
import { ProductService } from 'src/app/services/product/product.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  packages: any;

  constructor(public prod: ProductService, private paymentService: PaymentService) { }  
  ngOnInit(): void {
    this.paymentService.getItems().subscribe(res => {
      this.packages = res;
    });
  }

}
