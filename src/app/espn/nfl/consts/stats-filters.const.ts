import { FilterOptions } from '@app/@shared/models/filter.model';
import { FootballStat, NFL_STATS_LIST } from 'sports-ui-sdk';

export function transformToEquivalentEnum<T>(value: toStringable): T;
export function transformToEquivalentEnum<T>(value: toStringable | null): T | null;
export function transformToEquivalentEnum<T>(value: toStringable | undefined): T | undefined;
export function transformToEquivalentEnum<T>(value: toStringable | null | undefined): T | null | undefined;
export function transformToEquivalentEnum<T>(value: toStringable | null | undefined): T | null | undefined {
  return value === null ? null : value === undefined ? undefined : (value.toString() as unknown as T);
}

interface toStringable {
  toString: (...args: any[]) => string;
}

export const FOOTBALL_STATS_FILTER: FilterOptions<string>[] = NFL_STATS_LIST.map(stat => ({
  label: stat.description,
  value: stat.id,
}));

[FootballStat.PT, FootballStat.PY, FootballStat.RY, FootballStat.RTD];

export const FOOTBALL_STATS_QB = NFL_STATS_LIST.filter(stat =>
  [FootballStat.PT, FootballStat.PY, FootballStat.RY, FootballStat.RTD].includes(
    transformToEquivalentEnum<FootballStat>(stat.id) as FootballStat
  )
).map(stat => ({
  label: stat.description,
  value: stat.id,
}));
