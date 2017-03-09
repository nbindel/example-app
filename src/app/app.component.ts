import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { AppActions } from './app.actions';

@Component({
  selector: 'zoo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to the Zoo';
  @select() readonly elephants$;

  constructor(ngRedux: NgRedux<any>, actions: AppActions) {
    ngRedux.dispatch(actions.loadData());
    console.log('WAT', ngRedux, NgRedux.instance);
  }
}
