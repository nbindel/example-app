import { AnimalActions } from './animal.actions';
import { IPayloadAction } from '../core/utils/payload-action.types';
import { IAnimalList, IAnimal } from './animal.types';
import { NgRedux, dispatch, ReduxAction, BaseReduxAction } from '@angular-redux/store';
import { ReduxActionRestorer } from '@angular-redux/store/lib/src/components/redux-actions/redux-action-restorer';

const INITIAL_STATE: IAnimalList = {
  items: [],
  loading: false,
  error: null,
};

type AnimalType = string;

export class Actions 
{
  public static readonly ANIMAL_LOAD_STARTED = "AnimalLoadStarted";
  public static readonly ANIMAL_LOAD_SUCCEEDED = "AnimalLoadSucceeded";
  public static readonly ANIMAL_LOAD_FAILED = "AnimalLoadFailed";
}

abstract class BaseAnimalAction extends BaseReduxAction<IAnimalList>
{
  public AnimalType : AnimalType;

  constructor(actionName: string, animalType: AnimalType) {
    super(actionName);

    this.AnimalType = animalType;
  } 
}

@ReduxAction()
export class AnimalLoadStarted extends BaseAnimalAction
{
  constructor(animalType: AnimalType) {
    super(Actions.ANIMAL_LOAD_STARTED, animalType);
  }

  execute(state: IAnimalList) : IAnimalList
  {
    return {
          items: [],
          loading: true,
          error: null,
        };
  }
}

@ReduxAction()
export class AnimalLoadSucceeded extends BaseAnimalAction
{
  private animals: any[];

  constructor(animalType: AnimalType, animals: IAnimal[]) {
    super(Actions.ANIMAL_LOAD_SUCCEEDED, animalType);

    this.animals = animals;
  }  

  execute(state: IAnimalList) : IAnimalList
  {
    return {
          items: this.animals,
          loading: false,
          error: null
        };
  }
}

@ReduxAction()
export class AnimalLoadFailed extends BaseAnimalAction
{
  private error: any;

  constructor(animalType: AnimalType, error: any) {
    super(Actions.ANIMAL_LOAD_FAILED, animalType);

    this.error = error;
  }

  execute(state: IAnimalList) : IAnimalList
  {
    return {
          items: [],
          loading: false,
          error: this.error
        };
  }
}



// A higher-order reducer: accepts an animal type and returns a reducer
// that only responds to actions for that particular animal type.
export function createAnimalReducer(animalType: AnimalType) {
  //return function NgRedux.actionRestorerReducer;
    return function animalReducer(state: IAnimalList = INITIAL_STATE, action: any): IAnimalList {
//      if (!action.meta || action.meta.animalType !== animalType) {
//        return state;
//      }

      state = ReduxActionRestorer.reducer(state, action);

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
