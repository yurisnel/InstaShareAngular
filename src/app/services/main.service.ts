import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent
} from "@angular/router";
import { Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { IBreadCrums, IUrlTitle } from "../models/url-title.interface";


@Injectable()
export class MainService {  
  breadCrumbs: IBreadCrums[] = [];
  
  constructor(
    private title: Title,
    private router: Router,
    //private activatedRouter: ActivatedRoute
  ) {
   
  }

  setDefaultTitle(defaultTitle: string) {
    this.title.setTitle(defaultTitle);
  }

  getSetRouterTitle(): Observable<IUrlTitle> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        //let childRouter = this.activatedRouter.firstChild ;
        let childRouter: ActivatedRoute = this.router.routerState.root;
        while (childRouter.firstChild) {
          childRouter = childRouter.firstChild;
        }
        if (childRouter.snapshot.data["title"]) {
          let titleBreadCrums: IUrlTitle = {
            url: childRouter.snapshot.url.toString(),
            title: childRouter.snapshot.data["title"]
          };
          return titleBreadCrums;
        }
        return {
          url: childRouter.snapshot.url.toString(),
          title: this.title.getTitle()
        };
      }),
      map((titleUrl: IUrlTitle) => {
        this.breadCrumbs.length = 0;
        let menuItem = this.generateBreadCrums(this.router.routerState.root);
        this.breadCrumbs.push(...menuItem);
        return { ...titleUrl, breadCrums: this.breadCrumbs };
      }),
      tap((currentTitle: IUrlTitle) => {
        this.title.setTitle(currentTitle.title);
      })
    );
  }
  generateBreadCrums(
    activatedRouter: ActivatedRoute,
    url = "",
    breadcrumbs: IBreadCrums[] = []
  ): any {
    const children: ActivatedRoute[] = activatedRouter.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join("/");
      if (routeURL !== "") {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data["title"];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.generateBreadCrums(child, url, breadcrumbs);
    }
  }
}
