import { normalizeStringToNumber, objectIsEmpty } from '@app/@shared/helpers/utils';
import {
  ClientSlatePlayerAttributesMap,
  ClientSlateTeamAttributes,
  ClientSlateTeamAttributesMap,
  Vegas as ClientVegas,
  SITE_TO_SITETYPE_MAP,
  SlateWeather,
} from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { NFLClientOutsidersProperties, NFLClientSafptsProperties } from '@sports-ui/daily-fantasy-sdk/models';
import { Vegas } from '../models/vegas.model';
import { MLBClientTeamAttributes } from '@sports-ui/daily-fantasy-sdk/models';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { SlatePlayer } from '../models/slate-player.model';
import { Weather } from '../models/weather.model';
import { Outsiders, SaFpts, SlateTeamNfl } from '../nfl/models/nfl-slate-attr.model';

export function transformMlbSlateTeamAttributes(teamAttributes: ClientSlateTeamAttributes, site: string): MLBClientTeamAttributes {
  const obj = {} as MLBClientTeamAttributes;

  for (const prop in teamAttributes) {
    switch (prop) {
      case 'pitcher':
      case 'vegas':
        obj[prop] = teamAttributes[prop];
        break;
      default:
        obj[prop] = normalizeStringToNumber(teamAttributes[prop][site]);
        break;
    }
  }

  return obj;
}

export function transformTeamSlateAttributes(teams: ClientSlateTeamAttributesMap) {
  if (objectIsEmpty(teams)) return [];

  return Object.entries(teams).map(([id, team]) => {
    const { vegas, outsiders, safpts } = transformSlateTeamAttributesToSlateTeamNfl(team);
    return { id, vegas, outsiders, safpts };
  });
}

export function transformPlayerSlateAttributes(players: ClientSlatePlayerAttributesMap, site: string): SlatePlayer[] {
  if (objectIsEmpty(players)) return [];

  const siteMap = SITE_TO_SITETYPE_MAP[site];

  return Object.entries(players).map(([id, player]) => ({
    id,
    statGroup: player.stat_group ?? null,
    salaryDiff: player.salary_diff?.[siteMap] ?? null,
    slateOwn: player.slate_ownership?.[siteMap] ?? null,
    ownership: normalizeStringToNumber(player.ownership?.[siteMap]) ?? null,
    value: normalizeStringToNumber(player.value_pct?.[siteMap]) ?? null,
    smash: normalizeStringToNumber(player.smash_pct?.[siteMap]) ?? null,
  }));
}

export function transformWeather(games: Record<string, SlateWeather>): Weather[] {
  return Object.entries(games).map(([id, game]) => ({
    id,
    ...game.weather,
  }));
}

export function transformSlateTeamAttributesToSlateTeamNfl(teamAttributes: ClientSlateTeamAttributes | null | undefined): SlateTeamNfl {
  const final = { outsiders: null, safpts: null, vegas: null } as SlateTeamNfl;

  if (!exists(teamAttributes)) return final;

  final.outsiders = transformClientOutsidersToOutsiders(teamAttributes.outsiders);

  final.safpts = transformClientSafptsToSafpts(teamAttributes.safpts);

  final.vegas = transformClientVegasToVegas(teamAttributes.vegas);

  return final;
}

export function transformClientOutsidersToOutsiders(client: NFLClientOutsidersProperties | null | undefined): Outsiders | null {
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

  return parseStringValuesToNumbers<Outsiders>(obj);
}

export function transformClientVegasToVegas(client: ClientVegas | null | undefined): Vegas | null {
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

export function transformClientSafptsToSafpts(client: NFLClientSafptsProperties | null | undefined): SaFpts | null {
  if (!exists(client)) return null;

  const { RawQB, AdjQB, DifQB, RAWRB, AdjRB, DifRB, RawWR, AdjWR, DifWR, RawTE, AdjTE, DifTE } = client;

  const obj = {
    rawQB: RawQB,
    adjQB: AdjQB,
    difQB: DifQB,
    rawRB: RAWRB,
    adjRB: AdjRB,
    difRB: DifRB,
    rawWR: RawWR,
    adjWR: AdjWR,
    difWR: DifWR,
    rawTE: RawTE,
    adjTE: AdjTE,
    difTE: DifTE,
  } as Record<string, string>;

  return parseStringValuesToNumbers<SaFpts>(obj);
}

export function parseStringValuesToNumbers<T extends Record<string, number | null>>(obj: Record<string, string>): T {
  const res = {} as T;
  for (const key in obj) {
    const parsed = Number(obj[key].replace(/(%)|(-+)/, ''));
    (res as Record<string, number | null>)[key] = parsed;
  }
  return res;
}
