import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(): boolean{
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }
  constructor(public authService: AuthService, public router: Router) { }
}
