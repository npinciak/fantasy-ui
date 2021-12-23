import { SlateAttributes } from '../models/slate.interface';

/* eslint-disable @typescript-eslint/naming-convention */
export const MATCHUP: SlateAttributes = {
  games: {},
  players: {},
  teams: {
    stack_value: {
      draftkings: '0.24',
      fanduel: '-0.36',
      yahoo: '0.09',
    },
    top_value: {
      draftkings: '8.16%',
      fanduel: '11.92%',
      yahoo: '4.82%',
    },
    smash_value: {
      draftkings: '3.32%',
      fanduel: '3.25%',
      yahoo: '3.07%',
    },
    stack_leverage: {
      draftkings: '10.00',
      fanduel: '10.00',
      yahoo: '10.00',
    },
    stack_field: {
      draftkings: '0.00%',
      fanduel: '0.00%',
      yahoo: '0.00%',
    },
    stack_diff: {
      draftkings: '3.32%',
      fanduel: '3.25%',
      yahoo: '3.07%',
    },
    vegas: {
      'o/u': 9,
      opp_total: 5.69,
      total: 3.31,
      line: 220,
      movement: 0.19,
    },
    team_total: 3.31,
    pitcher: {
      last_name: 'McHugh',
      first_name: 'Collin',
      hand: 'R',
      id: '13540',
    },
  },
};
