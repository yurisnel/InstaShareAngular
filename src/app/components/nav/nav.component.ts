import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  items: any;
  @Input("modelItems") set menu(item: any) {
    this.items = item;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
