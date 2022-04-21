import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs/operators';
import { Package } from 'src/app/sections/package/package';
import { TokenStorageService } from '../token-storage/token-storage.service';
import {Router} from '@angular/router'

const URL_LINK = "http://localhost:3000/api";
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,
              private stripeService: StripeService,
              private tokenStorage: TokenStorageService,
              private router: Router) { }

  readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  getItems(){
    // this.http.get((URL + "/api/item/getItems"),this.httpOptions).subscribe(res => {
    //   console.log(res);
    // }) 
    return this.http.get(URL_LINK +"/item/getItems");
  }


  checkout(prods: any, totalPrice: Number){
    let user = this.tokenStorage.getUser();
    console.log(prods);
    if(Object.keys(user).length == 0){
      this.router.navigate(['/signup']);
      return;
    }
    this.http.post("http://localhost:3000/payment/create-checkout",{prods: JSON.stringify(prods),totalPrice,username: user.username},this.httpOptions)
    .pipe(
      switchMap((session: any) => {
        return this.stripeService.redirectToCheckout({sessionId: session.id })
      })
    )
    .subscribe(result => {
      if(result.error){
        console.error(result.error.message);
      }
    })
  }
}
