import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware } from 'redux-observable';
import { Action, Store } from 'redux';
import { IReduxAction } from '@angular-redux/store';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AnimalType, ANIMAL_TYPES, IAnimalList } from '../animals/animal.types';
import { AnimalActions } from '../animals/animal.actions';
import { AnimalService } from './animal.service';
import { Actions, AnimalLoadSucceeded, AnimalLoadFailed } from './animal.reducer';

@Injectable()
export class AnimalEpics {
  constructor(
    private service: AnimalService,
    private actions: AnimalActions,
  ) {}

  public createEpic(animalType: AnimalType) {
    return createEpicMiddleware(this.createLoadAnimalEpic(animalType));
  }

  private createLoadAnimalEpic(animalType) {
    return action$ => action$
      .ofType(Actions.ANIMAL_LOAD_STARTED)
      .filter(({payload}) => {
        return payload.AnimalType === animalType;
      })
      .switchMap(a => this.service.getAll(animalType)
        .map(data => {
          let action: IReduxAction<IAnimalList> = new AnimalLoadSucceeded(animalType, data);

          return action.toDispatchAction();
        })
        .catch(response => { 
          let action: IReduxAction<IAnimalList> = new AnimalLoadFailed(animalType, { status: '' + response.status, });

          return of(action.toDispatchAction());
        })
      );
  }

  // private createLoadAnimalEpic(animalType) {
  //   return action$ => action$
  //     .ofType(AnimalActions.LOAD_STARTED)
  //     .filter(({ meta }) => meta.animalType === animalType)
  //     .switchMap(a => this.service.getAll(animalType)
  //       .map(data => this.actions.loadSucceeded(animalType, data))
  //       .catch(response => of(this.actions.loadFailed(animalType, {
  //         status: '' + response.status,
  //       }))));
  // }
}
