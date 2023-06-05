type BasePlayerEntityProps = 'id' | 'name' | 'img' | 'team' | 'teamId' | 'teamUid' | 'position';

/**
 * Base front end player model
 *
 * Any player related models should extend this model
 */
export type PlayerEntity = { [prop in BasePlayerEntityProps]: string };
