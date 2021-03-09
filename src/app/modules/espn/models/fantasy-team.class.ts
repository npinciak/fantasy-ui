import { Player } from './fantasy-player.class';
import { MLBFantasyPlayer, NFLFantasyPlayer } from './fantasy-player.class';

export class FantasyTeam {
    constructor(public _id: number, public _name: string, public _roster: Player[]) { }

    get id() {
        return this._id;
    };

    get name() {
        return this._name;
    };

}

export class MLBFantasyTeam extends FantasyTeam {
    constructor(public _id: number, public _name: string, public _roster: Player[], public _totalPoints: number,
        public _draftDayProjectedRank: number,
        public _currentProjectedRank: number,
        public _rankCalculatedFinal: number) {
        super(_id, _name, _roster);
    }

    get totalPoints() {
        return this._totalPoints;
    }
    get name() {
        return this._name;
    }

    get bench() {
        return this.roster.filter(p => !p.isStarter);
    }

    get starter() {
        return this.roster.filter(p => p.isStarter);
    }

    private get roster() {
        return this._roster.map(rosterEntry =>
            new MLBFantasyPlayer(
                rosterEntry.playerId,
                rosterEntry.playerPoolEntry.player.fullName,
                rosterEntry.playerPoolEntry.player.proTeamId,
                rosterEntry.playerPoolEntry.player.defaultPositionId,
                rosterEntry.playerPoolEntry.player.injured,
                rosterEntry.lineupSlotId
            ));
    }
}

export class NFLFantasyTeam extends FantasyTeam {
    constructor(public _id: number, public _name: string, public _roster: Player[]) {
        super(_id, _name, _roster);
    }

    private get roster() {
        return this._roster.map(rosterEntry => new NFLFantasyPlayer(
            rosterEntry.playerId,
            rosterEntry.playerPoolEntry.player.fullName,
            rosterEntry.playerPoolEntry.player.proTeamId,
            rosterEntry.playerPoolEntry.player.defaultPositionId,
            rosterEntry.playerPoolEntry.player.injured
        ));
    }
}
