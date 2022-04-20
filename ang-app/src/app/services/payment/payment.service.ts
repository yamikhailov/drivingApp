import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private stripeService: StripeService) { }

  readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  checkout(){
    this.http.post("http://localhost:3000/payment/create-checkout",{},this.httpOptions)
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
