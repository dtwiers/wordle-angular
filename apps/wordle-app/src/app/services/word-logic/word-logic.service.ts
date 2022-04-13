import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, scan, Subject, switchMap } from 'rxjs';
import { WordService } from '../word/word.service';
import { Game } from './word-logic.types';

@Injectable({
  providedIn: 'root',
})
export class WordLogicService {
  private target$ = new Subject<string>();
  private guess$ = new Subject<string>();

  private game$ = this.target$.pipe(
    switchMap((target) =>
      this.guess$.pipe(
        switchMap((guess) => [guess, this.wordService.validateWord(guess)]),
        scan((acc, val, idx) => []
      )
    )
  );
  constructor(private wordService: WordService) {}

  public newGame(target: string) {
    this.target$.next(target);
  }
}
