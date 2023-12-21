import { Component } from '@angular/core';
import { DfsFilterFacade } from '@app/dfs/facade/dfs-filter.facade';
import { DfsSelectedSlateConfigurationFacade } from '@app/dfs/facade/dfs-selected-slate-configuration.facade';
import { DfsSlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatePlayersFacade } from '@app/dfs/facade/dfs-slate-players.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { ClientSiteSlateEntity } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';

@Component({
  selector: 'app-dfs-home',
  template: '',
})
export class DfsHomeComponent {
  slatesEmpty$ = this.dfsSlateFacade.slatesEmpty$;
  selectSlateByType$ = this.dfsSlateFacade.selectSlateByType$;
  playersEmpty$ = this.dfsPlayersFacade.playersEmpty$;
  selectedSlate$ = this.dfsSelectedSlateConfigurationFacade.slateId$;

  teamFilter$ = this.dfsFilterFacade.team$;
  positionFilter$ = this.dfsFilterFacade.position$;
  nameFilter$ = this.dfsFilterFacade.name$;
  projectionTypeFilter$ = this.dfsFilterFacade.projectionType$;

  constructor(
    readonly dfsPlayersFacade: DfsSlatePlayersFacade,
    readonly dfsSlateFacade: DfsSlatesFacade,
    readonly dfsSlateAttrFacade: DfsSlateAttrFacade,
    readonly dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade,
    readonly dfsFilterFacade: DfsFilterFacade
  ) {}

  ngOnInit(): void {}

  onSelectSlate(event: ClientSiteSlateEntity) {
    const { slate_path, importId } = event;

    this.dfsPlayersFacade.fetchPlayers(slate_path);
    this.dfsSelectedSlateConfigurationFacade.setSlateId(importId);
    this.dfsSlateAttrFacade.fetchSlateAttributesBySlateId(importId);
  }
}
