import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

type WordObject = {
  word: string;
  score: number;
};

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private root = 'https://api.datamuse.com/words';

  constructor(private http: HttpClient) {}

  getTargetWord(seed?: string): Observable<string> {
    const sp = seed
      ? Buffer.from(seed, 'base64url').toString('binary')
      : '?????';
    const validWord = /^[abcdefghijklmnopqrstuvwxyz]{5}$/i;
    const randomLetterStart: string =
      ['abcdefghijklmnopqrstuvwxyz'][Math.floor(Math.random() * 26)] ?? 'a';
    return this.http
      .get<WordObject[]>(this.root, {
        params: {
          sp,
          max: seed ? 1 : 1000,
          s: seed ? '' : randomLetterStart,
        },
      })
      .pipe(
        map((result) =>
          result.filter((wordObject) => wordObject.word.match(validWord))
        ),
        map((result) => {
          if (!result.length || !result[0]) {
            throw new Error('Could not find any words');
          }
          if (seed) {
            return result[0].word;
          }
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return result[Math.floor(Math.random() * result.length)]!.word
        })
      );
  }
}
