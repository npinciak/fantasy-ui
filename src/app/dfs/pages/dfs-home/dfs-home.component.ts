import { Component } from '@angular/core';
import { DfsMatchupsFacade } from '@app/dfs/facade/dfs-matchups.facade';
import { DfsSelectedSlateConfigurationFacade } from '@app/dfs/facade/dfs-selected-slate-configuration.facade';
import { DfsSlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatePlayersFacade } from '@app/dfs/facade/dfs-slate-players.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { SiteSlateEntity } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';

@Component({
  selector: 'app-dfs-home',
  template: '',
})
export class DfsHomeComponent {
  slatesEmpty$ = this.dfsSlateFacade.slatesEmpty$;
  selectSlateByType$ = this.dfsSlateFacade.selectSlateByType$;

  playersEmpty$ = this.dfsPlayersFacade.playersEmpty$;

  selectedSlate$ = this.dfsSelectedSlateConfigurationFacade.slateId$;

  constructor(
    readonly dfsPlayersFacade: DfsSlatePlayersFacade,
    readonly dfsSlateFacade: DfsSlatesFacade,
    readonly dfsSlateAttrFacade: DfsSlateAttrFacade,
    readonly dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade
  ) {}

  ngOnInit(): void {}

  onSelectSlate(event: SiteSlateEntity) {
    const { slate_path, importId } = event;

    this.dfsPlayersFacade.fetchPlayers(slate_path);
    this.dfsSelectedSlateConfigurationFacade.setSlateId(importId);
    this.dfsSlateAttrFacade.fetchSlateAttributesBySlateId(importId);
  }
}
