import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/pages/login/login.component';
import { Page404Component } from './views/pages/page404/page404.component';
import { ProfileComponent } from './views/pages/profile/profile.component';
import { FaqComponent } from './views/pages/faq/faq.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        component: DashboardComponent,
        /*loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)*/
      },  
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        },
      },     
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'FAQ'
        },
      },   
      {
        path: 'contact',
        component: ContactComponent,
        data: {
          title: 'Contact'
        },
      }     
    ]
  },  
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'page404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
