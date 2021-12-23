export class ShowFastcastScoreboard {
  static readonly type = `[shell] ShowFastcastScoreboard`;
  constructor(public payload: { showFastcastScoreboard: boolean }) {}
}
