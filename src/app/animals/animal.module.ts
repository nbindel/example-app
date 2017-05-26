import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalEpics } from './animal.epics';
import { AnimalService } from './animal.service';
import { StoreModule } from '../store/store.module';

@NgModule({
  declarations: [AnimalListComponent],
  exports: [AnimalListComponent],
  imports: [CoreModule, StoreModule, CommonModule],
  providers: [AnimalEpics, AnimalService],
})
export class AnimalModule {}
