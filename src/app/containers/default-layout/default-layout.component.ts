import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { INavItem } from 'src/app/models/nav-item.interface';
import { IUrlTitle } from 'src/app/models/url-title.interface';
import { User } from 'src/app/models/user.model';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  user?: User;
  routerTitle?: IUrlTitle; 
  sidebarNav: INavItem[] = [
    {title: 'Dasboard', url:'home', icon:'bi-grid'},
    {title: 'Tables', url:'', icon:'bi-layout-text-window-reverse', subitems: [
      {title: 'General Tables', url:'/tables01', icon:'bi-circle'},
      {title: 'Data Tables', url:'/tables02', icon:'bi-circle'},
    ]},
    {title: 'Pages', url:'', icon:''},
    {title: 'Profile', url:'/profile', icon:'bi-person'},
    {title: 'F.A.Q', url:'/faq', icon:'bi-question-circle'},
    {title: 'Contact', url:'/contact', icon:'bi-envelope'},
    {title: 'Register', url:'/register', icon:'bi-card-list'},
    {title: 'Login', url:'/login', icon:'bi-box-arrow-in-right'},
    {title: 'Error 404', url:'/page404', icon:'bi-dash-circle'},
  ]
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
    
    let u = localStorage.getItem('user');
    if(u){
      this.user = JSON.parse(u);
    }
    this.mainService.onSetUser().subscribe(user =>{
      this.user = user;
      localStorage.setItem('user',JSON.stringify(this.user));
    });

    this.routerTitle = this.mainService.getTitleBreadCrums();
    this.mainService.getSetRouterTitle()
    .subscribe((routerTitle:IUrlTitle) => {
      this.routerTitle = routerTitle;
    });
  }  
  
}
