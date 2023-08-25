export interface AuthenticationFormStateModel {
  email: string | null;
  password: string | null;
}

export const INITIAL_STATE: AuthenticationFormStateModel = {
  email: null,
  password: null,
};
