import { Component, Input, OnInit } from '@angular/core';
import { ShellFacade } from '@app/@core/shell/facade/shell.facade';
import { GRID_TEMPLATE } from '@app/@shared/helpers/grid';
import { UrlBuilder, UrlFragments, UrlQueryParams } from '@app/@shared/url-builder';
import { EspnFastcastFacade } from '@app/espn-fastcast/facade/espn-fastcast.facade';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent implements OnInit {
  @Input() pageTitle = 'SportsUi';

  readonly GRID_TEMPLATE = GRID_TEMPLATE;
  readonly URL_FRAGMENT = UrlFragments;
  readonly URL_QUERY_PARAMS = UrlQueryParams;
  readonly UrlBuilder = UrlBuilder;

  constructor(readonly shellFacade: ShellFacade, private fastcastFacade: EspnFastcastFacade) {}

  ngOnInit(): void {
    this.fastcastFacade.connect();
  }
}
