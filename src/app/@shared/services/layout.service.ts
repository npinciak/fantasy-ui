import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isMobile$ = this.breakpoints.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(map(v => v.matches));

  constructor(private breakpoints: BreakpointObserver) {}
}
