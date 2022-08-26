/**
 * Base front end player model
 *
 * Any player related models should extend this model
 */
type PlayerProps = 'id' | 'name' | 'img' | 'team' | 'teamId' | 'teamUid' | 'position';

export type Player = { [prop in PlayerProps]: string };
