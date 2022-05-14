/**
 * Base player model
 */
interface PlayerProperties {
  id: string;
  name: string;
  img: string;
  team: string;
  teamUid: string;
  position: string;
}

export type Player = PlayerProperties;
