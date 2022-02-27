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
import { BreadcrumsComponent } from './components/breadcrums/breadcrums.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { Page404Component } from './views/pages/page404/page404.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  BreadcrumsComponent,
  NavComponent,
  RegisterComponent,
  Page404Component,
  LoginComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,   
    ReactiveFormsModule,    
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },    
    Title,
    MainService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
