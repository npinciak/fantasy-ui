/**
 * Base player model
 */
type PlayerProperties = 'id' | 'name' | 'img' | 'team' | 'teamId' | 'teamUid' | 'position';

export type Player = { [prop in PlayerProperties]: string };
