export class SetActionCount {
  public static readonly type = `[ngxs_actions_executing] SetActionCount`;
  constructor(public payload: { actionType: string; count: number }) {}
}
