import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { FASTCAST_EVENT_TYPE } from '@sports-ui/ui-sdk/espn-fastcast-client';

interface EspnFastcastLeagueToggleStateModel {
  eventType: string | null;
  leagueSlug: string | null;
  sportSlug: string | null;
}

@State<EspnFastcastLeagueToggleStateModel>({
  name: 'espnFastcastLeagueToggle',
  defaults: {
    eventType: FASTCAST_EVENT_TYPE.TopEvents,
    leagueSlug: null,
    sportSlug: null,
  },
})
@Injectable()
export class EspnFastcastLeagueToggleState {}
