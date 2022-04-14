import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  private lastPoppedUrl?: string;
  private yScrollStack: number[] = [];

  @Input() isLoggedIn = false;
  @Input() username = "";
  @Input() private roles: string[] = [];


  constructor(public location: Location, private router: Router, private tokenStorage: TokenStorageService, public prod: ProductService) {
  }

  ngOnInit() {
    
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
         if (event.url != this.lastPoppedUrl)
             this.yScrollStack.push(window.scrollY);
     } else if (event instanceof NavigationEnd) {
         if (event.url == this.lastPoppedUrl) {
             this.lastPoppedUrl = undefined!;
             window.scrollTo(0, this.yScrollStack.pop()!);
         } else
             window.scrollTo(0, 0);
     }
   });
   this.location.subscribe((ev:PopStateEvent) => {
       this.lastPoppedUrl = ev.url!;
   });

   // managing auth
//    this.isLoggedIn = !!this.tokenStorage.getToken();
//    if(this.isLoggedIn){
//        const user = this.tokenStorage.getUser();
//        this.roles = user.roles;
//        this.username = user.username;

//    }
  }

  logout(){
    this.tokenStorage.signOut();
    window.location.reload();
  }


  isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());

      if( titlee === '#/home' ) {
          return true;
      }
      else {
          return false;
      }
  }
  isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if( titlee === '#/documentation' ) {
          return true;
      }
      else {
          return false;
      }
  }
}
