import { nflTeamMap } from '.';
import { nflPositionMap } from '.';

export class FantasyPlayer {

    constructor(
        private _playerId: number,
        private _name: string,
        private _positionId: number,
        private _teamId: number,
        private _injured: boolean
    ) { }

    get playerId() {
        return this._playerId;
    };

    get name() {
        return this._name;
    };

    get positionId() {
        return this._positionId;
    };

    get defaultPosition() {
        return nflPositionMap[this._positionId].abbrev;
    }

    get proTeam() {
        return nflTeamMap[this._teamId];
    }

    get teamId() {
        return this._teamId;
    };

    get isInjured() {
        return this._injured;
    }

}

export interface Player {
    playerId: number;
    name: string;
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
