import { IAnimalList, IAnimal } from './animal.types';
import { ReduxActionRestorer } from '@angular-redux/store/lib/src/components/redux-actions/redux-action-restorer';

const INITIAL_STATE: IAnimalList = {
  items: [],
  loading: false,
  error: null,
};

type AnimalType = string;

// A higher-order reducer: accepts an animal type and returns a reducer
// that only responds to actions for that particular animal type.
export function createAnimalReducer(animalType: AnimalType) {
  return function animalReducer(state: IAnimalList = INITIAL_STATE, action: any): IAnimalList {
    return ReduxActionRestorer.reducer(state, action);
  };
}
