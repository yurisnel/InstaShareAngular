import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.scss']
})
export class BreadcrumsComponent implements OnInit {
  items: any;
  @Input("modelItems") set menu(item: any) {
    this.items = item;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
