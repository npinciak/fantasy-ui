import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TeamComponent } from '@mlb/pages/team/team.component';
import { HomeComponent } from '@mlb/pages/home/home.component';
import { HomeComponent as NFLHomeComponent } from '@espn/nfl/pages/home/home.component';

const leagueId = environment.production ? '' : environment.leagueId;

const routes: Routes = [
  { path: 'espn', component: HomeComponent },
  {
    path: 'espn/mlb/:leagueId',
    children: [
      { path: '', component: HomeComponent },
      { path: 'team/:teamId', component: TeamComponent },
    ],
  },
  {
    path: 'espn/nfl/:leagueId',
    children: [
      { path: '', component: NFLHomeComponent },
      // { path: 'team/:teamId', component: TeamComponent },
    ],
  },
  { path: '**', redirectTo: `espn/mlb/${leagueId}`, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
