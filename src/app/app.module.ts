import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';


// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultLayoutComponent,
} from './containers';
import { MainService } from './services/main.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { Page404Component } from './views/pages/page404/page404.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './http.interceptor';
import { ApiService } from './services/api.service';
import { AlertComponent } from './components/alert/alert.component';
import { ProfileComponent } from './views/pages/profile/profile.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { FormControlValidationDirective } from './directives/formcontrol-validation.directive';
import { FormSubmitValidationDirective } from './directives/formsubmit-validation.directive';
import { TablesComponent } from './views/pages/tables/tables.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  BreadcrumbComponent,
  NavComponent,
  AlertComponent,
  UploadImageComponent,    
  FormControlValidationDirective,
  FormSubmitValidationDirective,
  RegisterComponent,
  Page404Component,
  LoginComponent,
  ProfileComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, TablesComponent],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,   
    ReactiveFormsModule,   
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['http://localhost:3000/api/v1/auth/login'],
      },
    }), 
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    ApiService, 
    Title,
    MainService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
