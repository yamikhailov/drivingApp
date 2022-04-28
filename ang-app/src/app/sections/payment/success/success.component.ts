import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private productService: ProductService,
              private userService: UserService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.productService.clearCart();
    // let user = this.tokenStorage.getUser();
    // this.userService.getUser(user.username).subscribe(out => {
    //   this.tokenStorage.saveUser(Object.assign(user,out));
    // });
  }

}
