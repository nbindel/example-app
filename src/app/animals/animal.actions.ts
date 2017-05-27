import { dispatch, ReduxAction, BaseReduxAction } from '@angular-redux/store';
import { Action } from 'redux';
import { IAnimalList, IAnimal } from './animal.types';

type AnimalType = string;

export class Actions {
  public static readonly ANIMAL_LOAD_STARTED = "AnimalLoadStarted";
  public static readonly ANIMAL_LOAD_SUCCEEDED = "AnimalLoadSucceeded";
  public static readonly ANIMAL_LOAD_FAILED = "AnimalLoadFailed";
}

abstract class BaseAnimalAction extends BaseReduxAction<IAnimalList> {
  public AnimalType : AnimalType;

  constructor(actionName: string, animalType: AnimalType) {
    super(actionName);

    this.AnimalType = animalType;
  } 
}

@ReduxAction()
export class AnimalLoadStarted extends BaseAnimalAction {
  constructor(animalType: AnimalType) {
    super(Actions.ANIMAL_LOAD_STARTED, animalType);
  }

  execute(state: IAnimalList) : IAnimalList {
    return {
          items: [],
          loading: true,
          error: null,
        };
  }
}

@ReduxAction()
export class AnimalLoadSucceeded extends BaseAnimalAction {
  private animals: IAnimal[];

  constructor(animalType: AnimalType, animals: IAnimal[]) {
    super(Actions.ANIMAL_LOAD_SUCCEEDED, animalType);

    this.animals = animals;
  }  

  execute(state: IAnimalList) : IAnimalList {
    return {
          items: this.animals,
          loading: false,
          error: null
        };
  }
}

@ReduxAction()
export class AnimalLoadFailed extends BaseAnimalAction {
  private error: any;

  constructor(animalType: AnimalType, error: any) {
    super(Actions.ANIMAL_LOAD_FAILED, animalType);

    this.error = error;
  }

  execute(state: IAnimalList) : IAnimalList {
    return {
          items: [],
          loading: false,
          error: this.error
        };
  }
}
