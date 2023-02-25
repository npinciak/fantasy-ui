/**
 * Base front end player model
 *
 * Any player related models should extend this model
 */
type BasePlayerEntityProps = 'id' | 'name' | 'img' | 'team' | 'teamId' | 'teamUid' | 'position';

export type PlayerEntity = { [prop in BasePlayerEntityProps]: string };
