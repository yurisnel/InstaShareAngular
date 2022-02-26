import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { first, Observable } from 'rxjs';
import { IUrlTitle } from 'src/app/models/url-title.interface';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  routerTitle?: IUrlTitle; 
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private mainService: MainService
  ) { }

  toggle_sidebar(event: Event) {   
     //this.renderer.addClass(this.document.body, 'toggle-sidebar');
     this.document.body.classList.toggle('toggle-sidebar');
  }

  ngOnInit() {
       
    this.mainService.getSetRouterTitle()
    .subscribe((routerTitle:IUrlTitle) => {
      this.routerTitle = routerTitle;
    });
  }  
  
}
