import { exists, normalizeStringToNumber, objectIsEmpty } from '@app/@shared/helpers/utils';
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
import { NewTeamSlateAttributes, Outsiders, SaFpts } from './nfl/models/nfl-slate-attr.model';

export namespace DfsSlateHelpers {
  function transformClientVegasToVegas(client: ClientVegas | null | undefined): Vegas | null {
    if (!exists(client)) return null;
    return {
      overUnder: client['o/u'],
      oppTotal: client.opp_total,
      total: client.total,
      line: client.line,
      movement: client.movement,
    };
  }

  function transformClientSafptsToSafpts(client: NFLClientSafptsProperties | null | undefined): SaFpts | null {
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
    };

    return convertIntObj(obj);
  }

  function convertIntObj<T>(obj: Object) {
    const res = {};
    for (const key in obj) {
      const parsed = Number(obj[key].replace(/(\%)|(\-+)/, ''));
      res[key] = parsed;
    }
    return res as T;
  }

  function transformClientOutsidersToOutsiders(client: NFLClientOutsidersProperties | null | undefined): Outsiders | null {
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
      oppRuDefRk: client['Opp RuDef'],
      paOff: client.PaOff,
      paOffRk: client['PaOff Rk'],
      ruOff: client.RuOff,
      ruOffRk: client['RuOff Rk'],
    };

    return convertIntObj(obj);
  }

  export function normalizeSlateTeamAttributes(teamAttributes: ClientSlateTeamAttributes | null | undefined): NewTeamSlateAttributes {
    const final = { outsiders: null, safpts: null, vegas: null } as NewTeamSlateAttributes;

    if (!exists(teamAttributes)) return final;

    const outsiders = transformClientOutsidersToOutsiders(teamAttributes.outsiders);
    final['outsiders'] = outsiders;

    const safpts = transformClientSafptsToSafpts(teamAttributes.safpts);
    final['safpts'] = safpts;

    const vegas = null; //transformClientVegasToVegas(teamAttributes.vegas);
    final['vegas'] = vegas;

    return final;
  }

  function camelCaseObjProps(obj: Object) {
    return Object.keys(obj).map(k => camelCase(k));
  }

  export function normalizeStatGroupToProfiler(pos: NFLClientStatGroup): {
    qb: ProfilerQB[];
    rb: ProfilerRB[];
    te: ProfilerReceiver[];
    wr: ProfilerReceiver[];
  };
  export function normalizeStatGroupToProfiler(pos: undefined): null;
  export function normalizeStatGroupToProfiler(
    statGroup: NFLClientStatGroup | undefined
  ): { qb: ProfilerQB[]; rb: ProfilerRB[]; te: ProfilerReceiver[]; wr: ProfilerReceiver[] } | null {
    if (!exists(statGroup) || objectIsEmpty(statGroup)) {
      return null;
    }

    const statGroupQb = statGroup.qb.profiler.season;
    const statGroupRb = statGroup.rb.profiler.season;
    const statGroupWr = statGroup.wr.profiler.season;
    const statGroupTe = statGroup.te.profiler.season;

    const qb = transformStatGroup<ProfilerQB>(statGroupQb);
    const rb = transformStatGroup<ProfilerRB>(statGroupRb);
    const te = transformStatGroup<ProfilerReceiver>(statGroupTe);
    const wr = transformStatGroup<ProfilerReceiver>(statGroupWr);

    return {
      qb,
      rb,
      te,
      wr,
    };
  }

  function transformStatGroup<T>(obj: NFLClientProfilerTimeFrameEntity | undefined): T[] {
    if (!obj) {
      return [];
    }

    const f = [] as any[];

    for (const [key, value] of Object.entries(obj)) {
      const transform = {
        rgId: key,
        productionPremium: normalizeStringToNumber(value['Production Premium']),
        matchupRtg: isNFLClientProfilerReceiver(value) ? normalizeStringToNumber(value['Matchup Rtg']) : null,
        weeklyVolatility: normalizeStringToNumber(value['Weekly Volatility']),
      };

      f.push(transform);
    }
    return f;
  }

  export function isNFLClientProfilerQB(
    value: NFLClientProfilerQBProperties | NFLClientProfilerRBProperties | NFLClientProfilerReceiverProperties
  ): value is NFLClientProfilerQBProperties {
    return value.hasOwnProperty('Total QBR');
  }

  export function isNFLClientProfilerRB(
    value: NFLClientProfilerQBProperties | NFLClientProfilerRBProperties | NFLClientProfilerReceiverProperties
  ): value is NFLClientProfilerRBProperties {
    return value.hasOwnProperty('passEpa');
  }

  export function isNFLClientProfilerReceiver(
    value: NFLClientProfilerQBProperties | NFLClientProfilerRBProperties | NFLClientProfilerReceiverProperties
  ): value is NFLClientProfilerReceiverProperties {
    return value.hasOwnProperty('Matchup Rtg');
  }
}
