import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlFragments } from '@app/@core/store/router/url-builder';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

export const routes: Routes = [
  {
    path: UrlFragments.Empty,
    component: MyProfileComponent,
  },

  { path: '**', redirectTo: UrlFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspnRoutingModule {}
