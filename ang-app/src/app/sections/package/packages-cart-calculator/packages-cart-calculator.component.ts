import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges, Input} from '@angular/core';
import { Package } from '../package';
import { PaymentService } from 'src/app/services/payment/payment.service';


@Component({
  selector: 'app-packages-cart-calculator',
  templateUrl: './packages-cart-calculator.component.html',
  styleUrls: ['./packages-cart-calculator.component.scss']
})
export class PackagesCartCalculatorComponent implements OnInit {


  @Input() products: Package[] = [];
  constructor(private paymentService: PaymentService) { }

  
  totalPrice = 0;

  ngOnChanges(changes: SimpleChanges){
    const change: SimpleChange = changes.products;
    let prods: Package[] = change.currentValue;
    this.totalPrice = 0;
    for(let prod of prods){
      this.totalPrice += +prod.price;
    }
  }

  ngOnInit(): void {
  }


  checkout() {
    this.paymentService.checkout();
  }
}
