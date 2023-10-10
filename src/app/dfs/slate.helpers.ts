import { ClientSlateTeamAttributes } from '@dfsClient/daily-fantasy-client-slate-attr.model';
import { ClientVegas } from '@dfsClient/daily-fantasy-client.model';
import {
  NFLClientOutsidersProperties,
  NFLClientSafptsProperties
} from '@sports-ui/daily-fantasy-sdk/models';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { camelCase } from 'lodash';
import { Vegas } from './models/vegas.model';
import { Outsiders, SaFpts, SlateTeamNfl } from './nfl/models/nfl-slate-attr.model';

export class DfsSlateHelpers {
  static transformClientVegasToVegas(client: ClientVegas | null | undefined): Vegas | null {
    if (!exists(client)) return null;

    const { total, line, movement } = client;
    return {
      overUnder: client['o/u'],
      oppTotal: client.opp_total,
      total,
      line,
      movement,
    };
  }

  static transformClientSafptsToSafpts(client: NFLClientSafptsProperties | null | undefined): SaFpts | null {
    if (!exists(client)) return null;

    const obj = {
      rawQB: client.RawQB,
      adjQB: client.AdjQB,
      difQB: client.DifQB,
      rawRB: client.RAWRB,
      adjRB: client.AdjRB,
      difRB: client.DifRB,
      rawWR: client.RawWR,
      adjWR: client.AdjWR,
      difWR: client.DifWR,
      rawTE: client.RawTE,
      adjTE: client.AdjTE,
      difTE: client.DifTE,
    } as Record<string, string>;

    return DfsSlateHelpers.convertIntObj(obj);
  }

  static convertIntObj<T>(obj: Record<string, string>): T {
    const res = {} as T;
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
      const parsed = Number(obj[key].replace(/(%)|(-+)/, ''));
      res[key] = parsed;
    }
    return res;
  }

  static transformClientOutsidersToOutsiders(client: NFLClientOutsidersProperties | null | undefined): Outsiders | null {
    if (!exists(client)) return null;
    const obj = {
      dPower: client['D Power'],
      dPowerRk: client['D Power Rk'],
      dStuffed: client['D Stuffed'],
      dStuffedRk: client['D Stuffed Rk'],
      dlSkRate: client['DL SkRate'],
      dlSkRateRk: client['DL SkRate Rk'],
      oPower: client['O Power'],
      oPowerRk: client['O Power Rk'],
      oStuffed: client['O Stuffed'],
      oStuffedRk: client['O Stuffed Rk'],
      olSkRate: client['OL SkRate'],
      olSkRateRk: client['OL SkRate Rk'],
      oppPaDef: client['Opp PaDef'],
      oppPaDefRk: client['Opp PaDef Rk'],
      oppRuDef: client['Opp RuDef'],
      oppRuDefRk: client['Opp RuDef Rk'],
      paOff: client.PaOff,
      paOffRk: client['PaOff Rk'],
      ruOff: client.RuOff,
      ruOffRk: client['RuOff Rk'],
    } as Record<string, string>;

    return DfsSlateHelpers.convertIntObj(obj);
  }

  static normalizeSlateTeamAttributes(teamAttributes: ClientSlateTeamAttributes | null | undefined): SlateTeamNfl {
    const final = { outsiders: null, safpts: null, vegas: null } as SlateTeamNfl;

    if (!exists(teamAttributes)) return final;

    final.outsiders = DfsSlateHelpers.transformClientOutsidersToOutsiders(teamAttributes.outsiders);

    final.safpts = DfsSlateHelpers.transformClientSafptsToSafpts(teamAttributes.safpts);

    final.vegas = DfsSlateHelpers.transformClientVegasToVegas(teamAttributes.vegas);

    return final;
  }


}
