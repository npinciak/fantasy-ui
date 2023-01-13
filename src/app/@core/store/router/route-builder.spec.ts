import { EspnRouteBuilder } from './route-builder';

describe('Route Builder', () => {
  const sportPathFragments = ['espn', 'nfl'];
  const seasonPathFragments = [...sportPathFragments, '2022'];
  const leaguePathFragments = [...seasonPathFragments, 'league', '1234'];
  const teamPathFragments = [...leaguePathFragments, 'team', '1'];
  const freeAgentsPathFragments = [...leaguePathFragments, 'free-agents'];
  const emptyPathFragments = [];

  describe('sportPath', () => {
    it('should create correct path fragments', () => {
      const actual = EspnRouteBuilder.sportPathFragments('nfl');
      expect(actual).toEqual(sportPathFragments);
    });

    it('should return empty array if any fragment is null', () => {
      const actual = EspnRouteBuilder.sportPathFragments(null);
      expect(actual).toEqual(emptyPathFragments);
    });
  });

  describe('seasonPath', () => {
    it('should create correct path fragments', () => {
      const actual = EspnRouteBuilder.seasonPathFragments('nfl', '2022');
      expect(actual).toEqual(seasonPathFragments);
    });

    it('should return empty array if any fragment is null', () => {
      const actual = EspnRouteBuilder.seasonPathFragments('nfl', null);
      expect(actual).toEqual(emptyPathFragments);
    });
  });

  describe('leaguePath', () => {
    it('should create correct path fragments', () => {
      const actual = EspnRouteBuilder.leaguePathFragments('nfl', '2022', '1234');
      expect(actual).toEqual(leaguePathFragments);
    });

    it('should return empty array if any fragment is null', () => {
      const actual = EspnRouteBuilder.leaguePathFragments('nfl', null, '1234');
      expect(actual).toEqual(emptyPathFragments);
    });
  });

  describe('teamPath', () => {
    it('should create correct path fragments', () => {
      const actual = EspnRouteBuilder.teamPathFragments('nfl', '2022', '1234', '1');
      expect(actual).toEqual(teamPathFragments);
    });

    it('should return empty array if any fragment is null', () => {
      const actual = EspnRouteBuilder.teamPathFragments('nfl', '2022', '1234', null);
      expect(actual).toEqual(emptyPathFragments);
    });
  });

  describe('freeAgentsPath', () => {
    it('should create correct path fragments', () => {
      const actual = EspnRouteBuilder.freeAgentsPathFragments('nfl', '2022', '1234');
      expect(actual).toEqual(freeAgentsPathFragments);
    });

    it('should return empty array if any fragment is null', () => {
      const actual = EspnRouteBuilder.freeAgentsPathFragments('nfl', '2022', null);
      expect(actual).toEqual(emptyPathFragments);
    });
  });
});
