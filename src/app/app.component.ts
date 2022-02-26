import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { IUrlTitle } from './models/url-title.interface';
import { MainService } from './services/main.service';
import { first } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'Insta_share_angular';
  routerEventsTitle$: Observable<IUrlTitle> | undefined;
  
  constructor(
    private mainService: MainService
  ) {
    this.mainService.setDefaultTitle(this.title);
  }  
}
