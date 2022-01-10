/**
 * Base player model
 */
interface PlayerProperties {
  id: string;
  name: string;
  img: string;
  team: string;
  position: string;
}

export type Player = PlayerProperties & { rgId: string; teamId: string; rgTeamId: string };
