import { Component, Input, OnInit } from '@angular/core';
import { RouterFacade } from '@app/@core/router/router.facade';

@Component({
  selector: 'app-shell-nav',
  templateUrl: './shell-nav.component.html',
})
export class ShellNavComponent implements OnInit {
  @Input() appTitle: string;
  constructor(readonly routerFacade: RouterFacade) {}

  ngOnInit(): void {}

  collapseShow = 'hidden';

  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
