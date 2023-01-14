import { GenericActions } from './generic.actions';
import { GenericSelectorClass, GenericStateClass, GenericStateModel } from './generic.model';
import { GenericSelector } from './generic.selector';
import { GenericState } from './generic.state';

describe('GenericSelector', () => {
  type EntityType = { id: string; name: string };

  let stateClass: GenericStateClass<EntityType>;
  let selector: GenericSelectorClass<EntityType>;

  class TestActions extends GenericActions<EntityType>({ stateName: 'testState' }) {}

  const state: GenericStateModel<EntityType> = {
    map: {
      '1': {
        id: '1',
        name: 'name1',
      },
      '2': {
        id: '2',
        name: 'name2',
      },
    },
  };

  beforeEach(() => {
    stateClass = GenericState({
      idProperty: 'id',
      addOrUpdate: TestActions.AddOrUpdate,
      clearAndAdd: TestActions.ClearAndAdd,
    });
    selector = GenericSelector(stateClass);
  });

  it('should get the map from state', () => {
    expect(selector.getMap(state)).toEqual(state.map);
  });

  it('should get an entity by id', () => {
    const getById = selector.getById(state.map);
    expect(getById('1')).toEqual(state.map['1']);
    expect(getById('2')).toEqual(state.map['2']);
    expect(getById('3')).toBeNull();
    expect(getById(null)).toBeNull();
  });

  it('should get a list of entities', () => {
    expect(selector.getList(state.map)).toEqual(Object.values(state.map));
  });

  it('should get a list of entity ids', () => {
    expect(selector.getIdList(state.map)).toEqual(Object.keys(state.map));
  });

  it('should get a set of entity ids', () => {
    expect(selector.getIdSet(Object.keys(state.map))).toEqual(new Set(Object.keys(state.map)));
  });
});
