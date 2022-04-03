import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { WordService } from './word.service';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('WordService', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(WordService);
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();
    const result = await lastValueFrom(service.getTargetWord());
    expect(result).toHaveLength(5);
    expect(result).toMatch(/^[a-z]{5}$/);
  });

  it('should follow a seed', async () => {
    const seed = 'Y2Fub2U';
    const result = await lastValueFrom(service.getTargetWord(seed));
    expect(result).toBe('canoe');
  });

  it('should reject an invalid seed', async () => {
    const seed = 'YSBjYXI';
    const observerSpy = subscribeSpyTo(service.getTargetWord(seed), {
      expectErrors: true,
    });
    await observerSpy.onError();
    expect(observerSpy.getError()).toEqual(
      new Error('Could not find any words')
    );
  });
});
