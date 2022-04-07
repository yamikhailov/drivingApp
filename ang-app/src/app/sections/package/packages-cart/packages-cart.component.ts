import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Package } from '../../packages/package';

@Component({
  selector: 'app-packages-cart',
  templateUrl: './packages-cart.component.html',
  styleUrls: ['./packages-cart.component.scss']
})
export class PackagesCartComponent implements OnInit {
 
  products: Package[] = [];

  constructor(private prod: ProductService) { }

  
  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(){
    this.products = this.prod.getCartItems();
  }

  removeItem(pack: Package){
    this.prod.removeItem(pack);
    this.getProducts();
  }
}
