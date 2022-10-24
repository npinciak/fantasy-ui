import { Component, Input, OnInit } from '@angular/core';
import { UrlBuilder, UrlFragments, UrlQueryParams } from '@app/@core/store/router/url-builder';
import { EspnFastcastFacade } from '@app/espn-fastcast/facade/espn-fastcast.facade';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent implements OnInit {
  @Input() pageTitle = 'SportsUi';

  readonly URL_FRAGMENT = UrlFragments;
  readonly URL_QUERY_PARAMS = UrlQueryParams;
  readonly UrlBuilder = UrlBuilder;

  constructor(private fastcastFacade: EspnFastcastFacade) {}

  ngOnInit(): void {
    this.fastcastFacade.connect();
  }
}
