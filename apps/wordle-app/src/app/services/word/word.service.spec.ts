import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { WordService } from './word.service';

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
    console.log(result);
  });

  it('should follow a seed', async () => {
    const seed = 'Y2Fub2U';
    const result = await lastValueFrom(service.getTargetWord(seed));
    expect(result).toBe('canoe');
  });

  it('should reject an invalid seed', async () => {
    const seed = 'YSBjYXI';
    const result = async () => await lastValueFrom(service.getTargetWord(seed));
    expect(result).toThrowError('Could not find any words');
  });
});
