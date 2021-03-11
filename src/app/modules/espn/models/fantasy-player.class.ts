import { mlbLineupMap } from './mlb-lineup.map';
import { mlbPositionMap } from './mlb-position.map';
import { mlbTeamMap } from './mlb-team.map';

export class FantasyPlayer {
    constructor(public _player: Player) { }



}

export class MLBFantasyPlayer extends FantasyPlayer {
    constructor(public _player: Player) {
        super(_player);
    }

    get name() {
        return this._player.playerPoolEntry.player.fullName;
    }

    get lineupSlot() {
        return mlbLineupMap[this._player.lineupSlotId].abbrev;
    }

    get defaultPosition() {
        return mlbPositionMap[this._player.playerPoolEntry.player.defaultPositionId].abbrev;
    }

    get proTeam() {
        return mlbTeamMap[this._player.playerPoolEntry.player.proTeamId];
    }

    get isStarter() {
        return mlbLineupMap[this._player.lineupSlotId].starter;
    }

    get displayOrder() {
        return mlbLineupMap[this._player.lineupSlotId].displayOrder;
    }

    get playerImg() {
        return `https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/${this._player.playerId}.png&w=96&h=70&cb=1`;
    }

    get ownership() {
        return this._player.playerPoolEntry.player.ownership;
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
    ownership: {
        averageDraftPosition: number;
        percentChange: number;
        percentOwned: number;
        percentStarted: number;
    };
    stats: StatsYear[];
}

interface StatsYear {

    seasonId: number;

    stats: unknown;
}


