import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspnComponent } from './modules/espn/espn.component';

const routes: Routes = [
    { path: 'espn', component: EspnComponent, }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule { }
