import { TestBed } from '@angular/core/testing';

import { WordLogicService } from './word-logic.service';

describe('WordLogicService', () => {
  let service: WordLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
