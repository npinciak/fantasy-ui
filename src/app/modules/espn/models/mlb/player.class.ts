import { FantasyPlayer, Player } from '../fantasy-player.class';
import { mlbLineupMap } from '../mlb-lineup.map';
import { mlbPositionMap } from '../mlb-position.map';
import { mlbTeamMap } from '../mlb-team.map';

enum RatingTimeFrame {
    season,
    last7,
    last14,
    last30
}

export class MLBFantasyPlayer extends FantasyPlayer {

    constructor(public _player: Player) {
        super(_player);
    }

    get name() {
        return this.playerInfo.fullName;
    }

    get playerId() {
        return this._player.playerId;
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

    get isPitcher() {
        return this.isPitcherAlgo(this.playerInfo.eligibleSlots);
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

    get positionalRankingSeason() {
        return this.ratingsSeason.positionalRanking;
    }

    get totalRatingSeason() {
        return this.ratingsSeason.totalRating;
    }

    get ownershipChange() {
        return this.ownership.percentChange;
    }

    get percentOwned() {
        return this.ownership.percentOwned;
    }

    get lastNewsDate() {
        const date1 = new Date(this.playerInfo.lastNewsDate).getTime();
        const date2 = new Date().getTime();

        return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) <= 7;
    }

    private get ratingsSeason() {
        return this.playerRatings[RatingTimeFrame.season];
    }

    private get ratingsL7() {
        return this.playerRatings[RatingTimeFrame.last7];
    }

    private get ratingsL14() {
        return this.playerRatings[RatingTimeFrame.last14];
    }

    private get ratingsL30() {
        return this.playerRatings[RatingTimeFrame.last30];
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

    private isPitcherAlgo(eligiblePos: number[], pitcherPos = [13, 14, 15]) {
        const eligibility = eligiblePos.filter(num => pitcherPos.indexOf(num) !== -1);
        return [... new Set(eligibility)].length > 0;
    }

}

// "statSplitOptions": [
//     "currSeason",
//     "last7",
//     "last15",
//     "last30",
//     "lastSeason",
//     "bvp",
//     "projections"
//   ],
