import { LineupCard } from '@app/espn/models/lineup-card.model';

export type FootballPlayerLineupCard = LineupCard & { projectedPoints: number | null };
