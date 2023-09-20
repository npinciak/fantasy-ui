import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPathFragments } from '@app/@core/router/url-builder';
import { SystemStatusComponent } from './system-status.component';

export const routes: Routes = [
  {
    path: UrlPathFragments.Empty,
    component: SystemStatusComponent,
  },
  { path: '**', redirectTo: UrlPathFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemStatusRoutingModule {}
