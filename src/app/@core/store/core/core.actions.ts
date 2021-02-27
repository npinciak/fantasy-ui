export class CoreAction {
  public static readonly type = '[Core] Add item';
  constructor(public payload: string) { }
}
