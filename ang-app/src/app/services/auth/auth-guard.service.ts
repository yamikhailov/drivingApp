import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenStorageService } from '../token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(): boolean{
    if(this.authService.isAuthenticated()){
      this.tokenService.signOut();
      this.router.navigate(['/signin']).then(() => {
        window.location.reload();
      });
      return false;
    }
    return true;
  }
  constructor(public authService: AuthService, public router: Router, private tokenService: TokenStorageService) { }
}
