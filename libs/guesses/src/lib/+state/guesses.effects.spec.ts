import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as GuessesActions from './guesses.actions';
import { GuessesEffects } from './guesses.effects';

describe('GuessesEffects', () => {
  let actions: Observable<Action>;
  let effects: GuessesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GuessesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GuessesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GuessesActions.init() });

      const expected = hot('-a-|', {
        a: GuessesActions.loadGuessesSuccess({ guesses: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
