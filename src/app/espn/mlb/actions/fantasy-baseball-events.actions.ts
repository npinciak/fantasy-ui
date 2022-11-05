import { BaseballEvent } from '../models/baseball-event.model';

export namespace FantasyBaseballEvents {
  export const name = 'fantasyBaseballEvents';
  type Entity = BaseballEvent;

  export class AddOrUpdate {
    public static readonly type = `[${name}}] AddOrUpdate`;
    constructor(public payload: Entity[]) {}
  }

  export class ClearAndAdd {
    public static readonly type = `[${name}}] ClearAndAdd`;
    constructor(public payload: Entity[]) {}
  }
}
