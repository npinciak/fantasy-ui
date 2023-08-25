import { Input } from '@angular/core';

import { Component } from '@angular/core';
import { ShellNavListItem } from './shell-nav-list.model';

@Component({
  selector: 'app-shell-nav-list',
  templateUrl: './shell-nav-list.component.html',
})
export class ShellNavListComponent {
  @Input() navList: ShellNavListItem[] = [];

  constructor() {}
}
