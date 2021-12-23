import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GRID_TEMPLATE } from '@app/@shared/helpers/grid';
import { UrlService } from '@app/@shared/services/url.service';
import { UrlFragments, UrlQueryParams } from '@app/@shared/url-builder';

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

  constructor(private router: Router, private urlService: UrlService) {}

  ngOnInit(): void {}

  get dfsNflConfig() {
    return this.router.navigate([this.urlService.getDfsNfl()], { queryParams: { site: 'draftkings' } });
  }

  get dfsMlbConfig() {
    return this.router.navigate([this.urlService.getDfsMlb], { queryParams: { site: 'draftkings' } });
  }
}
