import { statsKeyMap } from '../helpers';
import { Player, Team } from '../interface';
import { mlbStatMap, StatAbbrev } from '../maps/mlb-stat.map';
import { BaseballPlayer } from './player.class';

export class BaseballTeam {
  private _team: Team;
  private _roster: Player[];
  private _liveScore = 0;

  constructor(team: Team) {
    this._team = team;
  }

  get teamId() {
    return this._teamBase.id;
  }

  get teamName() {
    return `${this._teamBase.location} ${this._teamBase.nickname}`;
  }

  get teamAbbrev() {
    return this._teamBase.abbrev;
  }

  get teamLogo() {
    return this._teamBase.logo;
  }

  get roster() {
    return this._roster;
  }

  set roster(roster: Player[]) {
    this._roster = roster;
  }

  get totalPoints() {
    return this._teamBase.points;
  }

  get currentRank() {
    return this._teamBase.playoffSeed;
  }

  get rankDiff() {
    return this._teamBase.draftDayProjectedRank - this._teamBase.playoffSeed;
  }

  get stats() {
    return statsKeyMap(this._valuesByStat);
  }

  get rotoStats() {
    return statsKeyMap(this._rotoPointsByStats);
  }

  get totalBattingRoto() {
    return this._calcBattingTotal;
  }

  get totalPitchingRoto() {
    return this._calcPitchingTotal;
  }

  get liveScore() {
    return this._liveScore;
  }

  set liveScore(points: number) {
    this._liveScore = points;
  }

  private get _calcPitchingTotal() {
    const stat = statsKeyMap(this._rotoPointsByStats);
    return stat.w + stat.k + stat.sv + stat.era + stat.whip;
  }

  private get _calcBattingTotal() {
    const stat = statsKeyMap(this._rotoPointsByStats);
    return stat.r + stat.hr + stat.rbi + stat.sb + stat.avg;
  }

  private get _rotoPointsByStats() {
    return this._teamBase.pointsByStat;
  }

  private get _valuesByStat() {
    return this._teamBase.valuesByStat;
  }

  private get _teamBase() {
    return this._team;
  }
}
