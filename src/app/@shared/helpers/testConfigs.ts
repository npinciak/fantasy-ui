/* eslint-disable @typescript-eslint/naming-convention */
import { BaseballTeam } from '@espn/models/mlb/class/team.class';
import * as mockleague from '@espn/models/mlb/mocks/league.mock.json';
import { teamMap } from './mapping';

const TEST_ID = {
    STAT_TOGGLE: {
        BATTING_ROTO: 'battingRoto',
        PITCHING_ROTO: 'pitchingRoto'
    }

};

const MOCK_DATA = {
    BASEBALL_TEAM: new BaseballTeam(mockleague.teams[0]),
    BASEBALL_TEAM_MAP: teamMap(mockleague.teams, mockleague.schedule)
};



const getByTestId = (testId: string) => document.querySelectorAll(`[data-test-id*=${testId}]`);


// export const testAttr = (attr: string) => {
//     return `[data-test="${attr}"]`;
//   };
//
//   export const getByTestAttr = (attr: string, options = {}, childSelector = '') =>
//     cy.get(`${testAttr(attr)} ${childSelector}`.trim(), options);


export { getByTestId, MOCK_DATA, TEST_ID };
