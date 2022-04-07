import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Package } from 'src/app/sections/packages/package';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private toastr: ToastrService) { }


  addToCart(pack: Package): void{
    console.log("PACK",pack);
    let arr = JSON.parse(localStorage.getItem("cart") || '[]');
    arr.push(pack);
    localStorage.setItem("cart", JSON.stringify(arr));
    this.toastr.success("Product is added","test");
  }

  getCartItems(): Package[]{
     let a = JSON.parse(localStorage.getItem("cart") || '[]');
     return a;
  }

  removeItem(pack: Package): void{
    let arr = JSON.parse(localStorage.getItem("cart") || '[]');
    for(let i = 0; i < arr.length; i++){
      if(arr[i]._id == pack._id){
        arr.splice(i,1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(arr));
    }

}

