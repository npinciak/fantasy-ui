export class SetActionCount {
  public static readonly type = `[router] SetRouterState`;
  constructor(public payload: { actionType: string; count: number }) {}
}
