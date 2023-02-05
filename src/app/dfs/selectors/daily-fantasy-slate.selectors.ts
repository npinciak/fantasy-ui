import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { existsFilter } from '@app/@shared/utilities/utilities.m';
import { ClientSlateTypes, SiteSlateEntity, SiteSlateGameEntity } from '@dfsClient/daily-fantasy-client.model';
import { flatten } from 'lodash';
import { Weather } from '../models/weather.model';
import { DfsSlatesState } from '../state/dfs-slates.state';
import { DfsWeatherSelectors } from './dfs-weather.selectors';

export type SlateTypeMap = { [slateType in ClientSlateTypes]: SiteSlateEntity[] };

export class DailyFantasySlateSelectors extends GenericSelector(DfsSlatesState) {
  @Selector([DailyFantasySlateSelectors.getList])
  static getSlatesEmpty(slates: SiteSlateEntity[]): boolean {
    return slates.length <= 0;
  }

  @Selector([DailyFantasySlateSelectors.getList])
  static getSlateByType(slates: SiteSlateEntity[]): SlateTypeMap {
    return {
      [ClientSlateTypes.Classic]: slates.filter(slate => slate.type === ClientSlateTypes.Classic),
      [ClientSlateTypes.Pickem]: slates.filter(slate => slate.type === ClientSlateTypes.Pickem),
      [ClientSlateTypes.Showdown]: slates.filter(slate => slate.type === ClientSlateTypes.Showdown),
      [ClientSlateTypes.Short]: slates.filter(slate => slate.type === ClientSlateTypes.Short),
    };
  }

  @Selector([DailyFantasySlateSelectors.getSlateByType])
  static getSlateGamesBySlateType(slates: SlateTypeMap) {
    return (type: ClientSlateTypes) => {
      const games = existsFilter(slates[type].map(s => s.games));

      return flatten(games);
    };
  }

  @Selector([DailyFantasySlateSelectors.getSlateGamesBySlateType, DfsWeatherSelectors.getById])
  static getSlateGameWeather(
    games: (type: ClientSlateTypes) => SiteSlateGameEntity[],
    getWeatherById: (id: string | null) => Weather | null
  ) {
    return (type: ClientSlateTypes) => existsFilter(games(type).map(g => getWeatherById(g.rgScheduleId)));
  }
}
