import { DFS_SPORTS } from './daily-fantasy-client.const';

export type DfsSport = typeof DFS_SPORTS[keyof typeof DFS_SPORTS];
