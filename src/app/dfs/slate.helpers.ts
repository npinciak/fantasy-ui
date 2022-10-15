import { exists, objectIsEmpty } from '@app/@shared/helpers/utils';
import { ClientSlateTeamAttributes } from '@dfsClient/daily-fantasy-client-slate-attr.model';
import { ClientVegas } from '@dfsClient/daily-fantasy-client.model';
import { NFLClientOutsidersProperties, NFLClientProfiler, NFLClientSafptsProperties } from '@dfsClient/nfl-client.model';
import { camelCase } from 'lodash';
import { Vegas } from './models/vegas.model';
import { PlayerProfiler, PlayerProfilerSeason } from './nfl/models/nfl-profiler.model';
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

  export function normalizeStatGroupToProfiler(pos: NFLClientProfiler): PlayerProfiler;
  export function normalizeStatGroupToProfiler(pos: undefined): null;
  export function normalizeStatGroupToProfiler(pos: NFLClientProfiler | undefined): PlayerProfiler | null {
    if (!exists(pos) || objectIsEmpty(pos)) return null;

    const newPos = {} as PlayerProfilerSeason;

    const test = {};

    // Object.entries(pos.profiler.season).map(([id, props], i) => {
    //   console.log({ id, props });
    // });

    const season = Object.values(pos.profiler.season);

    const keys = season.map(v => camelCaseObjProps(v));

    // const an = Object.values(pos.profiler.season).map((v, i) => {
    //   const normalizedKeys = Object.keys(v).map(k => camelCase(k));

    //   newPos[normalizedKeys[i]] = v[i];

    //   console.log(v);

    //   return;
    // });
    // console.log(newPos);

    // console.log(an);
    // Object.keys(pos.profiler.season).map(k => {
    //   test[camelCase(k)] = 0;
    // });

    // console.log(test);
    // Object.entries(pos.profiler.season).map(([id, prop], i) => {
    //   // console.log({ id, prop[i] });

    //   const test = prop[i];

    //   // newPos[camelCase(prop)];
    //   // const normalizedProp = prop;
    //   // const normalizedVal = pos.profiler.season;
    //   // newPos[id] = normalizedVal;
    // });

    // for (const prop in pos.profiler.season) {
    //   if (pos.profiler.season.hasOwnProperty(prop)) {
    //     const normalizedProp = camelCase(prop);
    //     const normalizedVal = pos.profiler.season;
    //     newPos[normalizedProp] = normalizedVal;
    //   }
    // }

    // console.log(newPos);
    return newPos;
  }
}
