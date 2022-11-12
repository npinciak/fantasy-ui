import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@app/@shared/services/layout.service';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent implements OnInit {
  isMobile$ = this.layoutService.isMobile$;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {}
}
