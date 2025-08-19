import { TestBed } from '@angular/core/testing';

import { HistoryServiceTs } from './history.service.js';

describe('HistoryServiceTs', () => {
  let service: HistoryServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
