import { HTTP_INTERCEPTORS, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { TokenStorageService } from "../services/token-storage/token-storage.service";
import { Observable } from "rxjs";
const TOKEN_HEADER = "x-access-token";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenStorage: TokenStorageService){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let auth_req = req;
        const token = this.tokenStorage.getToken();
        if(token != null){
            auth_req = req.clone({headers: req.headers.set(TOKEN_HEADER, token)});
        }
        return next.handle(auth_req);
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];
