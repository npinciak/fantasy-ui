import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShellService } from './@core/shell/shell.service';
import { UrlPathFragments } from './@core/store/router/url-builder';

const routes: Routes = [
  ShellService.childRoutes([
    {
      path: UrlPathFragments.Espn,
      loadChildren: () => import('./espn/espn.module').then(m => m.EspnModule),
    },
    {
      path: `${UrlPathFragments.Espn}/${UrlPathFragments.Football}`,
      loadChildren: () => import('./espn-fantasy-football/espn-fantasy-football.module').then(m => m.EspnFantasyFootballModule),
    },
    {
      path: UrlPathFragments.Dfs,
      loadChildren: () => import('./dfs/dfs.module').then(m => m.DfsModule),
    },
    {
      path: UrlPathFragments.MyProfile,
      loadChildren: () => import('./sports-ui/sports-ui.module').then(m => m.SportsUiModule),
    },
    {
      path: UrlPathFragments.SystemStatus,
      loadChildren: () => import('./system-status/system-status.module').then(m => m.SystemStatusModule),
    },
    { path: '**', redirectTo: '/espn', pathMatch: 'full' },
  ]),
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
