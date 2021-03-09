import { mlbLineupMap } from './mlb-lineup.map';
import { mlbPositionMap } from './mlb-position.map';
import { mlbTeamMap } from './mlb-team.map';
import { nflPositionMap } from './nfl-position.map';
import { nflTeamMap } from './nfl-team.map';

export class FantasyPlayer {
    constructor(
        public id: number,
        public name: string,
        public teamId: number,
        public positionId: number,
        public injured: boolean
    ) { }
}

export class MLBFantasyPlayer extends FantasyPlayer {
    constructor(
        public id: number,
        public name: string,
        public teamId: number,
        public positionId: number,
        public injured: boolean,
        public lineupSlotId: number
    ) {
        super(id, name, teamId, positionId, injured);
    }

    get lineupSlot() {
        return mlbLineupMap[this.lineupSlotId].abbrev;
    }

    get defaultPosition() {
        return mlbPositionMap[this.positionId].abbrev;
    }

    get proTeam() {
        return mlbTeamMap[this.teamId];
    }

    get isStarter() {
        return mlbLineupMap[this.lineupSlotId].starter;
    }

    get displayOrder() {
        return mlbLineupMap[this.lineupSlotId].displayOrder;
    }
}

export class NFLFantasyPlayer extends FantasyPlayer {
    constructor(
        public id: number,
        public name: string,
        public teamId: number,
        public positionId: number,
        public injured: boolean,
    ) {
        super(id, name, teamId, positionId, injured);
    }

    get defaultPosition() {
        return nflPositionMap[this.positionId].abbrev;
    }

    get proTeam() {
        return nflTeamMap[this.teamId];
    }
}

export interface Player {
    playerId: number;
    name: string;
    lineupSlotId: number;
    playerPoolEntry: PlayerEntry;
}

interface PlayerEntry {
    player: PlayerInfo;
}

interface PlayerInfo {
    fullName: string;
    defaultPositionId: number;
    proTeamId: number;
    injured: boolean;
}
