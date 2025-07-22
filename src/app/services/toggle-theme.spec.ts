import { TestBed } from '@angular/core/testing';

import { ToggleTheme } from './toggle-theme';

describe('ToggleTheme', () => {
  let service: ToggleTheme;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleTheme);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
