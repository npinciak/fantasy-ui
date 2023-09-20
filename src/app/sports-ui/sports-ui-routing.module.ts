import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPathFragments } from '@app/@core/router/url-builder';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { SportsUiLeaguesResolver } from './resolvers/sports-ui-leagues.resolver';

export const routes: Routes = [
  {
    path: UrlPathFragments.Empty,
    component: MyProfileComponent,
    resolve: [SportsUiLeaguesResolver],
  },
  { path: '**', redirectTo: UrlPathFragments.Empty, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportsUiRoutingModule {}
