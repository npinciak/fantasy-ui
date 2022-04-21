import { Component, Input, OnInit } from '@angular/core';
import { GRID_TEMPLATE } from '@app/@shared/helpers/grid';
import { UrlBuilder, UrlFragments, UrlQueryParams } from '@app/@shared/url-builder';
import { EspnFastcastFacade } from '@app/espn/facade/espn-fastcast.facade';
import { ShellFacade } from './facade/shell.facade';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
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
