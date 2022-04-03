import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromGuesses from './+state/guesses.reducer';
import { GuessesEffects } from './+state/guesses.effects';
import { GuessesFacade } from './+state/guesses.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromGuesses.GUESSES_FEATURE_KEY,
      fromGuesses.reducer
    ),
    EffectsModule.forFeature([GuessesEffects]),
  ],
  providers: [GuessesFacade],
})
export class GuessesModule {}
