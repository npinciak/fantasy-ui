import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TeamComponent } from './modules/espn/pages/team/team.component';
import { EspnComponent } from './modules/espn/espn.component';

const leagueId = environment.production ? '' : environment.leagueId;

const routes: Routes = [
    { path: 'espn', component: EspnComponent },
    {
        path: 'espn/:sport/:leagueId',
        children: [
            { path: '', component: EspnComponent },
            { path: 'team/:teamId', component: TeamComponent }
        ]
    },
    { path: '**', redirectTo: `espn/mlb/${leagueId}`, pathMatch: 'full' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule { }
