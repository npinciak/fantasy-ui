import { CurrentConditions } from '@app/modules/weather/weather/models/class';
import { Competitor, EspnEvent } from '../interface';
import { MLB_STADIUM_MAP, mlbTeamMap } from '../maps/mlb-team.map';
import { domeStadiums } from '../mlb.const';
import { MLBTeam } from '../mlb.enums';

export class Game {
    private _event: EspnEvent;
    private _competitors: Map<number, Competitor> = new Map<number, Competitor>();
    private _homeTeam: number;
    private _awayTeam: number;
    private _currentConditions: CurrentConditions;

    constructor(event: EspnEvent) {
        this._event = event;
    }

    get gameId() {
        return this._event.id;
    }

    get currentConditions() {
        return this._currentConditions;
    }

    set currentConditions(val: CurrentConditions) {
        this._currentConditions = val;
    }

    get teams() {
        return this._competitors;
    }

    set competitors(val: Competitor[]) {
        for (const comp of val) {
            this._competitors.set(+comp.id, comp);
            if (comp.homeAway === 'home') {
                this._homeTeam = +comp.id;
            } else {
                this._awayTeam = +comp.id;
            }
        }
    }

    get homeTeam() {
        return {
            score: +this._competitors.get(this._homeTeam).score,
            abbrev: mlbTeamMap[this._homeTeam],
            logo: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/${mlbTeamMap[this._homeTeam].toLowerCase()}.png&h=100&w=100`,
            isWinner: this._competitors.get(this._homeTeam).winner
        };
    }

    get awayTeam() {
        return {
            score: +this._competitors.get(this._awayTeam).score,
            abbrev: mlbTeamMap[this._awayTeam],
            logo: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/${mlbTeamMap[this._awayTeam].toLowerCase()}.png&h=100&w=100`,
            isWinner: this._competitors.get(this._awayTeam).winner
        };
    }

    get summary() {
        return {
            event: this._event.summary,
            game: `${mlbTeamMap[this._awayTeam]} at ${mlbTeamMap[this._homeTeam]}`,
        };
    }

    get gameDate() {
        return {
            iso: this._event.date,
            milli: new Date(this._event.date).getTime()
        };
    }

    get location() {
        return `${MLB_STADIUM_MAP[this._homeTeam].lat}, ${MLB_STADIUM_MAP[this._homeTeam].lng}`;
    }

    get gameCompletePerc() {
        return this._event.percentComplete;
    }

    get isFinal() {
        return this._event.fullStatus.type.completed || this._event.fullStatus.type.name === 'STATUS_POSTPONED';
    }

    get stadium() {
        return {
            img: `${MLB_STADIUM_MAP[this._homeTeam].img}`,
            name: MLB_STADIUM_MAP[this._homeTeam].name,
            isDome: domeStadiums.includes(this._homeTeam)
        };
    }

}
