import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent
} from "@angular/router";
import { merge, Observable, Subject } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IBreadCrums, IUrlTitle } from "../models/url-title.interface";
import { User } from "../models/user.model";


@Injectable()
export class MainService {
  private breadCrumbs: IBreadCrums[] = [];
  private userData$ = new Subject<User>();

  constructor(
    private title: Title,
    private router: Router,
    //private activatedRouter: ActivatedRoute
  ) {

  }
  onSetUser(): Observable<User> {
    return this.userData$.asObservable();
  }
  setUser(user: User) {
    this.userData$.next(user);
  }

  setDefaultTitle(defaultTitle: string) {
    this.title.setTitle(defaultTitle);
  }

  getSetRouterTitle(): Observable<IUrlTitle> {
    const event$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        let titleBreadCrums: IUrlTitle = this.getTitleBreadCrums();
        this.title.setTitle(environment.title + " | " + titleBreadCrums.title);
        return titleBreadCrums;
      })
    );
    return merge(
      event$,
    );
  }
  getTitleBreadCrums() {
    let titleBreadCrums: IUrlTitle;
    //let childRouter = this.activatedRouter.firstChild ;
    let childRouter: ActivatedRoute = this.router.routerState.root;
    while (childRouter.firstChild) {
      childRouter = childRouter.firstChild;
    }

    if (childRouter.snapshot.data["title"]) {
      titleBreadCrums = {
        url: childRouter.snapshot.url.toString(),
        title: childRouter.snapshot.data["title"]
      };
    } else {
      titleBreadCrums = {
        url: childRouter.snapshot.url.toString(),
        title: this.title.getTitle()
      };
    }
    this.breadCrumbs.length = 0;
    let menuItem = this.generateBreadCrums(this.router.routerState.root);
    this.breadCrumbs.push(...menuItem);
    titleBreadCrums.breadCrums = this.breadCrumbs;

    this.title.setTitle(environment.title + " | " + titleBreadCrums.title);
    return titleBreadCrums;
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
