import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TeamComponent } from './modules/espn/pages/team/team.component';
import { EspnComponent } from './modules/espn/espn.component';
import { HomeComponent } from './modules/espn/pages/home/home.component';

const leagueId = environment.production ? '' : environment.leagueId;

const routes: Routes = [
  { path: 'espn', component: HomeComponent },
  {
    path: 'espn/:sport/:leagueId',
    children: [
      { path: '', component: HomeComponent },
      { path: 'team/:teamId', component: TeamComponent },
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
