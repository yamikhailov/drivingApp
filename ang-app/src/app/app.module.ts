import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './sections/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { PackagesComponent } from './sections/packages/packages.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './sections/auth/login/login.component';
import { RegisterComponent } from './sections/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfileViewComponent } from './sections/profile-view/profile-view.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';

//toastr
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// auth0/jwt
import { JwtModule } from '@auth0/angular-jwt';
import { SettingsComponent } from './sections/settings/settings.component';

//payment 
import { NgxStripeModule } from 'ngx-stripe';
import { SuccessComponent } from './sections/payment/success/success.component';
import { FailComponent } from './sections/payment/fail/fail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
//    PackagesComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileViewComponent,
    SettingsComponent,
    SuccessComponent,
    FailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("auth-token");
        }
      }
    }),
    NgxStripeModule.forRoot("pk_test_51KptOMHxx7x5cn6bSu1RA05n9K6W1NZoMn5OekkqusG8KfUs7ZP89jHQ8fzyYtFYNcpJLrksHxPtoMmaO3yeSPoo00aYk8zCpV")
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
