import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as GuessesActions from './guesses.actions';
import { GuessesEffects } from './guesses.effects';
import { GuessesFacade } from './guesses.facade';
import { GuessesEntity } from './guesses.models';
import {
  GUESSES_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './guesses.reducer';
import * as GuessesSelectors from './guesses.selectors';

interface TestSchema {
  guesses: State;
}

describe('GuessesFacade', () => {
  let facade: GuessesFacade;
  let store: Store<TestSchema>;
  const createGuessesEntity = (id: string, name = ''): GuessesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(GUESSES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([GuessesEffects]),
        ],
        providers: [GuessesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(GuessesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allGuesses$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allGuesses$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadGuessesSuccess` to manually update list
     */
    it('allGuesses$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allGuesses$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        GuessesActions.loadGuessesSuccess({
          guesses: [createGuessesEntity('AAA'), createGuessesEntity('BBB')],
        })
      );

      list = await readFirst(facade.allGuesses$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
