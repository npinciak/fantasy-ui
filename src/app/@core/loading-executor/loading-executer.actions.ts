export class SetActionCount {
  public static readonly type = `[loadingExecutor] SetActionCount`;
  constructor(public payload: { actionType: string; count: number }) {}
}
