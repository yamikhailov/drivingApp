import { Component, OnInit } from '@angular/core';
import { packages } from '../mock-packages';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  packages = packages;
  constructor(public prod: ProductService) { }
  
  ngOnInit(): void {
  }

}
