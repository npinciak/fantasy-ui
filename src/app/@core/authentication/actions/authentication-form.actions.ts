export class UpdateUser {
  static readonly type = `[authenticationForm] UpdateUser`;
  constructor(public payload: { email: string | null; password: string | null }) {}
}

export class Submit {
  static readonly type = `[authenticationForm] Submit`;
}

export class Reset {
  static readonly type = `[authenticationForm] Reset`;
}

export class SetEmail {
  static readonly type = `[authenticationForm] SetEmail`;
  constructor(public payload: { email: string | null }) {}
}

export class SetPassword {
  static readonly type = `[authenticationForm] SetPassword`;
  constructor(public payload: { password: string | null }) {}
}
