import { FantasyPlayer, Player } from './fantasy-player.class';

export class FantasyTeam {
    constructor(private _id: number, private _name: string, private _roster: Player[]) { }

    get id() {
        return this._id;
    };

    get name() {
        return this._name;
    };

    get roster() {
        return this._roster.map(rosterEntry => new FantasyPlayer(
            rosterEntry.playerId,
            rosterEntry.playerPoolEntry.player.fullName,
            rosterEntry.playerPoolEntry.player.defaultPositionId,
            rosterEntry.playerPoolEntry.player.proTeamId,
            rosterEntry.playerPoolEntry.player.injured
        ));
    };

}
