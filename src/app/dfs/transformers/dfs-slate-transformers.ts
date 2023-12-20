import { normalizeStringToNumber, objectIsEmpty } from '@app/@shared/helpers/utils';
import {
  ClientMlbSlateTeamAttributesMap,
  ClientNflSlatePlayerAttributesMap,
  ClientNflSlateTeamAttributesMap,
  ClientVegas,
  SITE_TO_SITETYPE_MAP,
  SlateWeather,
} from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { NFLClientOutsidersProperties, NFLClientSafptsProperties, NFLClientSlateAttrTeam } from '@sports-ui/daily-fantasy-sdk/models';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { SlatePlayerAttributeDetails } from '../models/slate-player.model';
import { SlateTeamMlbDetails, SlateTeamNfl } from '../models/slate-team.model';
import { Vegas } from '../models/vegas.model';
import { Weather } from '../models/weather.model';
import { Outsiders, SaFpts } from '../nfl/models/nfl-slate-attributes.model';

export function transformNflTeamSlateAttributes(teams: ClientNflSlateTeamAttributesMap) {
  if (objectIsEmpty(teams)) return [];

  return Object.entries(teams).map(([id, team]) => {
    const { vegas, outsiders, safpts } = transformSlateTeamAttributesToSlateTeamNfl(team);
    return { id, vegas, outsiders, safpts };
  });
}

export function transformMlbTeamSlateAttributes(teams: ClientMlbSlateTeamAttributesMap, site: string): SlateTeamMlbDetails[] {
  if (objectIsEmpty(teams)) return [];
  const siteType = SITE_TO_SITETYPE_MAP[site];

  return Object.entries(teams).map(([id, team]) => {
    const { stack_value, stack_leverage, stack_field, stack_diff, top_value, smash_pct, vegas } = team;

    const slateTeam: SlateTeamMlbDetails = {
      id,
      vegas: transformClientVegasToVegas(vegas),
      stackValue: stack_value ? stack_value[siteType] : null,
      stackLeverage: stack_leverage ? stack_leverage[siteType] : null,
      stackField: stack_field ? stack_field[siteType] : null,
      stackDiff: stack_diff ? stack_diff[siteType] : null,
      topValue: top_value ? top_value[siteType] : null,
      smashPct: smash_pct ? smash_pct[siteType] : null,
    };

    return slateTeam;
  });
}

export function transformNflPlayerSlateAttributes(players: ClientNflSlatePlayerAttributesMap, site: string): SlatePlayerAttributeDetails[] {
  if (objectIsEmpty(players)) return [];

  const siteType = SITE_TO_SITETYPE_MAP[site];

  return Object.entries(players).map(([id, player]) => {
    const slatePlayer: SlatePlayerAttributeDetails = {
      id,
      statGroup: player.stat_group ?? null,
      salaryDiff: player.salary_diff?.[siteType] ?? null,
      slateOwn: player.slate_ownership?.[siteType] ?? null,
      ownership: normalizeStringToNumber(player.ownership?.[siteType]) ?? null,
      value: normalizeStringToNumber(player.value_pct?.[siteType]) ?? null,
      smash: normalizeStringToNumber(player.smash_pct?.[siteType]) ?? null,
    };
    return slatePlayer;
  });
}

export function transformWeather(games: Record<string, SlateWeather>): Weather[] {
  return Object.entries(games).map(([id, game]) => ({
    id,
    ...game.weather,
  }));
}

export function transformSlateTeamAttributesToSlateTeamNfl(
  teamAttributes: NFLClientSlateAttrTeam | null | undefined
): Pick<SlateTeamNfl, 'outsiders' | 'safpts' | 'vegas'> {
  const final = { outsiders: null, safpts: null, vegas: null } as SlateTeamNfl;

  if (!exists(teamAttributes)) return final;

  return {
    outsiders: transformClientOutsidersToOutsiders(teamAttributes.outsiders),
    safpts: transformClientSafptsToSafpts(teamAttributes.safpts),
    vegas: transformClientVegasToVegas(teamAttributes.vegas),
  };
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
