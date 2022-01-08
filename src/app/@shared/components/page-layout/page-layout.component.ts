import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShellFacade } from '@app/@core/shell/facade/shell.facade';
import { GRID_TEMPLATE } from '@app/@shared/helpers/grid';
import { UrlService } from '@app/@shared/services/url.service';
import { UrlBuilder, UrlFragments, UrlQueryParams } from '@app/@shared/url-builder';
import { EspnFastcastFacade } from '@app/espn/facade/espn-fastcast.facade';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent implements OnInit {
  @Input() pageTitle = 'Espn Companion';

  readonly GRID_TEMPLATE = GRID_TEMPLATE;
  readonly URL_FRAGMENT = UrlFragments;
  readonly URL_QUERY_PARAMS = UrlQueryParams;
  readonly UrlBuilder = UrlBuilder;

  constructor(
    readonly shellFacade: ShellFacade,
    private fastcastFacade: EspnFastcastFacade,
    private router: Router,
    private urlService: UrlService
  ) {}

  ngOnInit(): void {
    this.fastcastFacade.connect();
  }

  get dfsNflConfig() {
    return this.router.navigate([this.urlService.getDfsNfl()], { queryParams: { site: 'draftkings' } });
  }

  get dfsMlbConfig() {
    return this.router.navigate([this.urlService.getDfsMlb], { queryParams: { site: 'draftkings' } });
  }
}
