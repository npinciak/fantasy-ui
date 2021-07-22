import { BaseballPlayerMap, BaseballTeamMap, EventMap, GameMap, TeamMap } from '@app/espn/mlb/state/mlb-state.model';
import { CurrentConditions } from '@espn/weather/weather/models/class';
import { WeatherValues } from '@espn/weather/weather/models/interface/currentWeather.interface';
import { BaseballGame } from '@mlb/class/game.class';
import { LeagueScoreboard } from '@mlb/class/leagueScoreboard.class';
import { BaseballPlayer } from '@mlb/class/player.class';
import { BaseballTeam } from '@mlb/class/team.class';
import { EspnClientPlayer, EspnClientTeam, EspnClientEvent } from '@mlb/interface';
import { EspnClientScheduleEntry } from '@mlb/interface/league';

const stadiumConditionsMap = (conditions: { [id: number]: WeatherValues }) => {
  if (Object.values(conditions).length === 0) {
    return {};
  }

  const conditionsMap: { [id: number]: CurrentConditions } = {};

  for (const [key, val] of Object.entries(conditions)) {
    conditionsMap[key] = new CurrentConditions(val);
  }

  return conditionsMap;
};

export { stadiumConditionsMap };
