import { normalizeStringToNumber, objectIsEmpty } from '@app/@shared/helpers/utils';
import { exists } from '@app/@shared/utilities/utilities.m';
import { ClientSlateTeamAttributes } from '@dfsClient/daily-fantasy-client-slate-attr.model';
import { ClientVegas } from '@dfsClient/daily-fantasy-client.model';
import {
  NFLClientOutsidersProperties,
  NFLClientProfilerQBProperties,
  NFLClientProfilerRBProperties,
  NFLClientProfilerReceiverProperties,
  NFLClientProfilerTimeFrameEntity,
  NFLClientSafptsProperties,
  NFLClientStatGroup,
} from '@dfsClient/nfl-client.model';
import { camelCase } from 'lodash';
import { Vegas } from './models/vegas.model';
import { ProfilerQB, ProfilerRB, ProfilerReceiver } from './nfl/models/nfl-profiler.model';
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

  static camelCaseObjProps(obj: Record<string, unknown>) {
    return Object.keys(obj).map(k => camelCase(k));
  }

  static normalizeStatGroupToProfiler(pos: NFLClientStatGroup): NormalizedProfiler;
  static normalizeStatGroupToProfiler(pos: undefined): null;
  static normalizeStatGroupToProfiler(statGroup: NFLClientStatGroup | undefined): NormalizedProfiler | null {
    if (!exists(statGroup) || objectIsEmpty(statGroup)) return null;

    const statGroupQb = statGroup.qb.profiler.season;
    const statGroupRb = statGroup.rb.profiler.season;
    const statGroupWr = statGroup.wr.profiler.season;
    const statGroupTe = statGroup.te.profiler.season;

    const qb = DfsSlateHelpers.transformStatGroup<ProfilerQB>(statGroupQb);
    const rb = DfsSlateHelpers.transformStatGroup<ProfilerRB>(statGroupRb);
    const te = DfsSlateHelpers.transformStatGroup<ProfilerReceiver>(statGroupTe);
    const wr = DfsSlateHelpers.transformStatGroup<ProfilerReceiver>(statGroupWr);

    return {
      qb,
      rb,
      te,
      wr,
    };
  }

  static transformStatGroup<T>(obj: NFLClientProfilerTimeFrameEntity | undefined): T[] {
    if (!obj) return [];

    const players = [] as any[];

    for (const [rgId, value] of Object.entries(obj)) {
      const transform = {
        rgId,
        productionPremium: normalizeStringToNumber(value['Production Premium']),
        matchupRtg: DfsSlateHelpers.isNFLClientProfilerReceiver(value) ? normalizeStringToNumber(value['Matchup Rtg']) : null,
        weeklyVolatility: normalizeStringToNumber(value['Weekly Volatility']),
        redZoneTargetShare: normalizeStringToNumber(value['Red Zone Target Share']),
        targetShare: normalizeStringToNumber(value['Target Share']),
        dominatorRating: normalizeStringToNumber(value['Dominator Rating']),
        protectionRate: normalizeStringToNumber(value['Protection Rate']),
        truePasserRating: normalizeStringToNumber(value['True Passer Rating']),
        pressuredCompletionPercentage: normalizeStringToNumber(value['Pressured Completion Percentage']),
        gameScript: normalizeStringToNumber(value['Game Script']),
        goalLineCarriesPerGame: normalizeStringToNumber(value['Goal Line Carries Per Game']),
      };

      players.push(transform);
    }

    return players;
  }

  static isNFLClientProfilerQB(
    value: NFLClientProfilerQBProperties | NFLClientProfilerRBProperties | NFLClientProfilerReceiverProperties
  ): value is NFLClientProfilerQBProperties {
    // eslint-disable-next-line no-prototype-builtins
    return value.hasOwnProperty('Total QBR');
  }

  static isNFLClientProfilerRB(
    value: NFLClientProfilerQBProperties | NFLClientProfilerRBProperties | NFLClientProfilerReceiverProperties
  ): value is NFLClientProfilerRBProperties {
    // eslint-disable-next-line no-prototype-builtins
    return value.hasOwnProperty('passEpa');
  }

  static isNFLClientProfilerReceiver(
    value: NFLClientProfilerQBProperties | NFLClientProfilerRBProperties | NFLClientProfilerReceiverProperties
  ): value is NFLClientProfilerReceiverProperties {
    // eslint-disable-next-line no-prototype-builtins
    return value.hasOwnProperty('Matchup Rtg');
  }
}

interface NormalizedProfiler {
  qb: ProfilerQB[];
  rb: ProfilerRB[];
  te: ProfilerReceiver[];
  wr: ProfilerReceiver[];
}
