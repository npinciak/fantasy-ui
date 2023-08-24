export const PLAYER_AVAILABILITY_STATUS = {
  FreeAgent: 'FREEAGENT',
  Waivers: 'WAIVERS',
  OnTeam: 'ONTEAM',
} as const;

export const PLAYER_AVAILABILITY_FILTER: { value: string; label: string }[] = [
  { value: PLAYER_AVAILABILITY_STATUS.FreeAgent, label: 'Free Agents' },
  { value: PLAYER_AVAILABILITY_STATUS.Waivers, label: 'Waivers' },
  { value: PLAYER_AVAILABILITY_STATUS.OnTeam, label: 'On Team' },
];
