import { Component, Input, OnInit } from '@angular/core';
import { GRID_TEMPLATE } from '@app/@shared/helpers/grid';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent implements OnInit {
  @Input() pageTitle = 'Espn Companion';

  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly GRID_TEMPLATE = GRID_TEMPLATE;

  constructor() {}

  ngOnInit(): void {}
}
