import { MLB_TEAM } from './consts/team.const';
import { SeasonConst } from './models/adv-stats.model';

export const domeStadiums = [MLB_TEAM.Tor, MLB_TEAM.Ari, MLB_TEAM.TB, MLB_TEAM.Min, MLB_TEAM.Hou, MLB_TEAM.Mia, MLB_TEAM.Tex];

export const weights2020: SeasonConst = {
  wBB: 0.699,
  wHBP: 0.728,
  w1B: 0.883,
  w2B: 1.238,
  w3B: 1.558,
  wHR: 1.979,
};

export const weights2021: SeasonConst = {
  wBB: 0.711,
  wHBP: 0.742,
  w1B: 0.901,
  w2B: 1.269,
  w3B: 1.6,
  wHR: 2.035,
  cFIP: 3.073,
};
