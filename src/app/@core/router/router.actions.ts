export class SetRouterState {
  public static readonly type = `[router] SetRouterState`;
  constructor(public payload: { routerStateParams }) {}
}
