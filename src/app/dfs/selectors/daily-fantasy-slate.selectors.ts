import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { ClientSiteSlateEntity, ClientSiteSlateGameEntity, ClientSlateType } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { SLATE_TYPES } from '@sports-ui/daily-fantasy-sdk/models';
import { existsFilter } from '@sports-ui/ui-sdk/helpers';
import { flatten } from 'lodash';
import { Weather } from '../models/weather.model';
import { DfsSlatesState } from '../state/dfs-slates.state';
import { DfsWeatherSelectors } from './dfs-weather.selectors';

export type SlateTypeMap = { [slateType in ClientSlateType]: ClientSiteSlateEntity[] };

export class DailyFantasySlateSelectors extends GenericSelector(DfsSlatesState) {
  @Selector([DailyFantasySlateSelectors.getList])
  static getSlatesEmpty(slates: ClientSiteSlateEntity[]): boolean {
    return slates.length <= 0;
  }

  @Selector([DailyFantasySlateSelectors.getList])
  static getSlateByType(slates: ClientSiteSlateEntity[]): SlateTypeMap {
    return {
      [SLATE_TYPES.Classic]: slates.filter(slate => slate.type === SLATE_TYPES.Classic),
      [SLATE_TYPES.Pickem]: slates.filter(slate => slate.type === SLATE_TYPES.Pickem),
      [SLATE_TYPES.Showdown]: slates.filter(slate => slate.type === SLATE_TYPES.Showdown),
      [SLATE_TYPES.Short]: slates.filter(slate => slate.type === SLATE_TYPES.Short),
    };
  }

  @Selector([DailyFantasySlateSelectors.getSlateByType])
  static getSlateGamesBySlateType(slates: SlateTypeMap) {
    return (type: ClientSlateType) => {
      const games = existsFilter(slates[type].map(s => s.games));

      return flatten(games);
    };
  }

  @Selector([DailyFantasySlateSelectors.getSlateGamesBySlateType, DfsWeatherSelectors.getById])
  static getSlateGameWeather(
    games: (type: ClientSlateType) => ClientSiteSlateGameEntity[],
    getWeatherById: (id: string | null) => Weather | null
  ) {
    return (type: ClientSlateType) => existsFilter(games(type).map(g => getWeatherById(g.rgScheduleId)));
  }
}
