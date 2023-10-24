import { StateOperator } from '@ngxs/store';
import { PropertyOfType } from '@sports-ui/ui-sdk/helpers';

export function toggleByField<StateModel extends object, Field extends PropertyOfType<StateModel, object>>(
  field: Field,
  idsToToggle: (string | number)[]
): StateOperator<StateModel> {
  return (state: Readonly<StateModel>) => {
    const ids = idsToToggle.reduce(
      (acc, id) => {
        acc[id] = !acc[id];
        return acc;
      },
      { ...state[field] }
    );

    return { ...state, [field]: ids };
  };
}
