import { Competitor } from '../interface';
import { MLB_STADIUM_MAP, mlbTeamMap } from '../maps/mlb-team.map';

export class Game {
    private _id: string;
    private _summary: string;
    private _competitors: Map<number, string> = new Map<number, string>();

    get gameId() {
        return Number(this._id);
    }

    set id(val: string) {
        this._id = val;
    }

    get teams() {
        return this._competitors;
    }

    set competitors(val: Competitor[]) {
        for (const comp of val) {
            this._competitors.set(Number(comp.id), comp.abbreviation);
        }
    }

    get summary() {
        return this._summary;
    get location() {
        return `${MLB_STADIUM_MAP[this._homeTeam].lat}, ${MLB_STADIUM_MAP[this._homeTeam].lng}`;
    }
    }

    set summary(val: string) {
        this._summary = val;
    get stadium() {
        return {
            img: `${MLB_STADIUM_MAP[this._homeTeam].img}`,
            name: MLB_STADIUM_MAP[this._homeTeam].name,
            isDome: domeStadiums.includes(this._homeTeam)
        };
    }

}
