import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  items: any;
  @Input("modelItems") set menu(item: any) {
    this.items = item;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
