import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GRID_TEMPLATE } from '@app/@shared/helpers/grid';
import { UrlFragments, UrlQueryParams } from '@app/@shared/urlBuilder';

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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  get dfsConfig() {
    return this.router.navigate([`/${UrlFragments.Dfs}/${UrlFragments.NFL}`], { queryParams: { site: 'draftkings' } });
  }

  get dfsConfigMLB() {
    return this.router.navigate([`/${UrlFragments.Dfs}/${UrlFragments.MLB}`], { queryParams: { site: 'draftkings' } });
  }
}
