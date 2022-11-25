<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@app/@shared/services/layout.service';
=======
import { Component } from '@angular/core';
>>>>>>> a539abaf408e10d5944de3ab1a263b99cbacab74

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
<<<<<<< HEAD
export class PageLayoutComponent implements OnInit {
  isMobile$ = this.layoutService.isMobile$;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {}
=======
export class PageLayoutComponent {
  constructor() {}
>>>>>>> a539abaf408e10d5944de3ab1a263b99cbacab74
}
