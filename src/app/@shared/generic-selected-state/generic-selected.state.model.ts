export interface SelectedStateModel {
  ids: { [id: string]: boolean };
}

export const SelectedInitialState: SelectedStateModel = {
  ids: {},
};
