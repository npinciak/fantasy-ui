export namespace AuthenticationForm {
  export const name = 'authenticationForm';

  export class SignIn {
    static readonly type = `[${name}] SignIn`;
  }

  export class Reset {
    static readonly type = `[${name}] Reset`;
  }

  export class UpdateUser {
    static readonly type = `[${name}] UpdateUser`;
    constructor(public payload: { email: string | null; password: string | null }) {}
  }

  export class SetEmail {
    static readonly type = `[${name}] SetEmail`;
    constructor(public payload: { email: string | null }) {}
  }

  export class SetPassword {
    static readonly type = `[${name}] SetPassword`;
    constructor(public payload: { password: string | null }) {}
  }
}
