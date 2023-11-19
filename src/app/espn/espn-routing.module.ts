import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPathFragments } from '@app/@core/router/url-builder';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';

export const routes: Routes = [
  {
    path: UrlPathFragments.Empty,
    component: EspnHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspnRoutingModule {}
