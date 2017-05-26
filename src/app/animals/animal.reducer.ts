//import { AnimalActions } from './animal.actions';
import { IPayloadAction } from '../core/utils/payload-action.types';
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
      if(action.payload && action.payload.AnimalType === animalType) {
        state = ReduxActionRestorer.reducer(state, action);
      }

      return state;
    };
  // return function animalReducer(state: IAnimalList = INITIAL_STATE,
  //   action: IPayloadAction<IAnimal[], any>): IAnimalList {
  //   if (!action.meta || action.meta.animalType !== animalType) {
  //     return state;
  //   }

  //   switch (action.type) {
  //     case AnimalActions.LOAD_STARTED:
  //       return {
  //         items: [],
  //         loading: true,
  //         error: null,
  //       };
  //     case AnimalActions.LOAD_SUCCEEDED:
  //       return {
  //         items: action.payload,
  //         loading: false,
  //         error: null
  //       };
  //     case AnimalActions.LOAD_FAILED:
  //       return {
  //         items: [],
  //         loading: false,
  //         error: action.error
  //       };
  //   }

  //   return state;
  // };
}
