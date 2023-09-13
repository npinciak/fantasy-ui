import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPathFragments } from '@app/@core/store/router/url-builder';

export const routes: Routes = [{ path: '**', redirectTo: UrlPathFragments.Empty, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspnFantasyFootballModuleRoutingModule {}
