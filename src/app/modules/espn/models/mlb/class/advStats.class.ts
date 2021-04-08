import { SeasonConst } from '../interface/adv.stats';
import { StatAbbrev } from '../maps/mlb-stat.map';

export class AdvStats {
    private stats: StatAbbrev;
    private seasonConst: SeasonConst;

    constructor(stats: StatAbbrev, seasonConst: any) {
        this.stats = stats;
        this.seasonConst = seasonConst;
    }


    get wOBA() {
        return this.hits / this.nonHits;
    }

    private get unintentionalBB() {
        return this.stats.bb - this.stats.ibb;
    }

    private get hits() {
        return (
            (this.seasonConst.wBB * this.unintentionalBB) +
            (this.seasonConst.wHBP * this.stats.hbp) +
            (this.seasonConst.w1B * this.stats['1b']) +
            (this.seasonConst.w2B * this.stats['2b']) +
            (this.seasonConst.w3B * this.stats['3b']) +
            (this.seasonConst.wHR * this.stats.hr)
        );
    }

    private get nonHits() {
        return (
            (this.stats.ab + this.stats.bb) -
            (this.stats.ibb + this.stats.sf + this.stats.hbp)
        );
    }


}
