import { Injectable } from '@angular/core';
import { fail, flatMap, ok } from '@brandingbrand/standard-result';
import { map, scan, Subject, switchMap } from 'rxjs';
import { WordService } from '../word/word.service';
import { Game, GameRow, MatchType } from './word-logic.types';

const evaluateGuess =
  (target: string) =>
  (guess: string): GameRow => {
    if (target.length === guess.length) {
      const splitGuess = guess.split('');
      const splitTarget = target.split('');
      return ok(
        splitGuess.map((character, index) => {
          if (character === target[index]) {
            return {
              attempt: character,
              matchType: MatchType.Full,
            };
          }
          if (
            target.includes(character) &&
            splitTarget.filter((targetChar) => targetChar === character)
              .length >=
              splitGuess
                .slice(0, index + 1)
                .filter((char) => char === character).length
          ) {
            return {
              attempt: character,
              matchType: MatchType.Partial,
            };
          }
          return {
            attempt: character,
            matchType: MatchType.None,
          };
        })
      );
    }
    return fail(guess);
  };
@Injectable({
  providedIn: 'root',
})
export class WordLogicService {
  private target$ = new Subject<string>();
  private guess$ = new Subject<string>();

  public game$ = this.target$.pipe(
    switchMap((target) =>
      this.guess$.pipe(
        switchMap((guess) =>
          this.wordService
            .validateWord(guess)
            .pipe(map((isValid) => [guess, isValid] as const))
        ),
        map(([guess, isValid]) => (isValid ? ok(guess) : fail(guess))),
        map(flatMap(evaluateGuess(target))),
        scan((acc, val) => [...acc, val], [] as Game)
      )
    )
  );

  constructor(private wordService: WordService) {}

  public newGame(target: string) {
    this.target$.next(target);
  }

  public guess(guess: string) {
    this.guess$.next(guess);
  }
}
