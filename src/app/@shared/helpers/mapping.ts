import { BaseballPlayerMap, BaseballTeamMap, EventMap, GameMap, TeamMap } from '@app/espn/mlb/state/mlb-state.model';
import { CurrentConditions } from '@espn/weather/weather/models/class';
import { WeatherValues } from '@espn/weather/weather/models/interface/currentWeather.interface';
import { BaseballGame } from '@app/espn/mlb/class/baseballGame.class';
import { LeagueScoreboard } from '@mlb/class/leagueScoreboard.class';
import { BaseballPlayer } from '@app/espn/mlb/class/baseballPlayer.class';
import { BaseballTeam } from '@app/espn/mlb/class/baseballTeam.class';
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
