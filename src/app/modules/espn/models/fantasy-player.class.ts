import { mlbLineupMap } from './mlb-lineup.map';
import { mlbPositionMap } from './mlb-position.map';
import { mlbTeamMap } from './mlb-team.map';

enum RatingTimeFrame {
    season,
    last7,
    last14,
    last30
}

export class FantasyPlayer {
    constructor(public _player: Player) { }
}

export class MLBFantasyPlayer extends FantasyPlayer {

    constructor(public _player: Player) {
        super(_player);
    }

    get name() {
        return this.playerInfo.fullName;
    }

    get lineupSlot() {
        return mlbLineupMap[this._player.lineupSlotId].abbrev;
    }

    get defaultPosition() {
        return mlbPositionMap[this.playerInfo.defaultPositionId].abbrev;
    }

    get proTeam() {
        return mlbTeamMap[this.playerInfo.proTeamId];
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

    get ratingsSeason() {
        return this.playerRatings[RatingTimeFrame.season];
    }

    get ratingsL7() {
        return this.playerRatings[RatingTimeFrame.last7];
    }

    get ratingsL14() {
        return this.playerRatings[RatingTimeFrame.last14];
    }

    get ratingsL30() {
        return this.playerRatings[RatingTimeFrame.last30];
    }

    get ownershipChange() {
        return this.ownership.percentChange;
    }

    get percentOwned() {
        return this.ownership.percentOwned;
    }

    private get playerRatings() {
        return this._player.playerPoolEntry.ratings;
    }

    private get ownership() {
        return this.playerInfo.ownership;
    }

    private get playerInfo() {
        return this._player.playerPoolEntry.player;
    }

}

export interface Player {
    playerId: number;
    lineupSlotId: number;
    playerPoolEntry: PlayerEntry;
}

interface PlayerEntry {
    player: PlayerInfo;
    ratings: PlayerRatings;
}

interface PlayerInfo {
    fullName: string;
    defaultPositionId: number;
    proTeamId: number;
    injured: boolean;
    injuryStatus: string;
    ownership: PlayerOwnership;
    stats: PlayerStatsYear[];
}

interface PlayerOwnership {
    averageDraftPosition: number;
    percentChange: number;
    percentOwned: number;
    percentStarted: number;
}

interface PlayerRatings {
    [key: number]: {
        positionalRanking: number;
        totalRanking: number;
        totalRating: number;
    };
}

interface PlayerStatsYear {
    seasonId: number;
    stats: unknown;
}

export interface PlayerNews {
    timestamp: string;
    resultsOffset: number;
    status: string;
    resultsLimit: number;
    resultsCount: number;
    feed?: (FeedEntity)[] | null;
}

interface FeedEntity {
    lastModified: string;
    headline: string;
    story: string;
}


