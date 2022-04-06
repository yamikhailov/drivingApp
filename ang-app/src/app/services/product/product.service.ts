import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private toastr: ToastrService) { }


  addToCart(){
    this.toastr.success("Product is added","test");
  }

  getCartItems(){

  }

}

