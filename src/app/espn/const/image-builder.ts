import { SportType } from '@sports-ui/ui-sdk';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { CDN_COMBINER, CDN_REDESIGN_IMG } from '../espn.const';

export function ImageBuilder({ sport, league }: { sport: SportType; league: string }) {
  return class ImageBuilderClass {
    private static readonly _cdn = CDN_COMBINER;
    private static readonly _cdnRedesign = CDN_REDESIGN_IMG;

    private static _sport = sport;
    private static _league = league;

    constructor() {}

    static get sportIconImgBuilder(): string {
      return `${this._cdnRedesign}?img=/redesign/assets/img/icons/ESPN-icon-${this._sport}.png&h=100&w=100`;
    }

    static logoImgBuilder({ id, width, height }: ImageBuilderInput): string {
      const w = exists(width) ? width : 100;
      const h = exists(height) ? height : 100;

      return `${this._cdn}?img=/i/teamlogos/${this._league}/500/${id}.png&w=${w}&h=${h}&cb=1`;
    }

    static headshotImgBuilder({ id, width, height }: ImageBuilderInput): string {
      const w = exists(width) ? width : 55;
      const h = exists(height) ? height : 40;

      const mediumW = exists(width) ? width : 426;
      const mediumH = exists(height) ? height : 320;

      return `${this._cdn}?img=/i/headshots/${this._league}/players/full/${id}.png&w=${w}&h=${h}&cb=1`;
    }
  };
}

export type ImageBuilderInput = {
  id: number | string;
  /**
   * @deprecated
   */
  league?: string;
  width?: number;
  height?: number;
};
