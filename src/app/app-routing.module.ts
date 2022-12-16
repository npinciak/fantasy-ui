import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShellService } from './@core/shell/shell.service';
import { UrlFragments } from './@core/store/router/url-builder';

const routes: Routes = [
  ShellService.childRoutes([
    {
      path: UrlFragments.Espn,
      loadChildren: () => import('./espn/espn.module').then(m => m.EspnModule),
    },
    {
      path: UrlFragments.Dfs,
      loadChildren: () => import('./dfs/dfs.module').then(m => m.DfsModule),
    },
    {
      path: 'my-profile',
      loadChildren: () => import('./sports-ui/sports-ui.module').then(m => m.SportsUiModule),
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
