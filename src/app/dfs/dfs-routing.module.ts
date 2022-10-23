import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlFragments } from '@app/@core/store/router/url-builder';
import { HomeComponent as DfsHomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: UrlFragments.Empty,
    component: DfsHomeComponent,
  },
  { path: '**', redirectTo: UrlFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DfsRoutingModule {}
