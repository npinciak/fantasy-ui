import { SeasonConst } from '../interface/adv.stats';
import { StatAbbrev } from '../maps/mlb-stat.map';

export class AdvStats {
    private _stats: StatAbbrev;
    private _seasonConst: SeasonConst;

    constructor() { }



    get stats() {
        return this._stats;
    }

    set stats(stats: StatAbbrev) {
        this._stats = stats;
    }

    get seasonConst() {
        return this._seasonConst;
    }

    set seasonConst(seasonConst: SeasonConst) {
        this._seasonConst = seasonConst;
    }

    get wOBA7() {
        return this.hits / this.nonHits;
    }

    get fip() {
        return (
            (13 * this._stats.hra) +
            (3 * (this._stats.bbi + this._stats.hb)) -
            (2 * this._stats.k))
            / this._stats.ip + this.seasonConst.cFIP;
    }

    private get hits() {
        return (
            (this.seasonConst.wBB * this.unintentionalBB) +
            (this.seasonConst.wHBP * this._stats.hbp) +
            (this.seasonConst.w1B * this._stats['1b']) +
            (this.seasonConst.w2B * this._stats['2b']) +
            (this.seasonConst.w3B * this._stats['3b']) +
            (this.seasonConst.wHR * this._stats.hr)
        );
    }

    private get nonHits() {
        return (
            (this.stats.ab + this.stats.bb) -
            (this.stats.ibb + this.stats.sf + this.stats.hbp)
        );
    }

    private get unintentionalBB() {
        return this.stats.bb - this.stats.ibb;
    }

}
