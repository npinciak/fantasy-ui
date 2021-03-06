import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './modules/espn/components/team/team.component';
import { EspnComponent } from './modules/espn/espn.component';

const routes: Routes = [
    { path: 'espn', component: EspnComponent },
    {
        path: 'espn/:sport/:leagueId',
        children: [
            { path: '', component: EspnComponent },
            { path: 'team/:teamId', component: TeamComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule { }
