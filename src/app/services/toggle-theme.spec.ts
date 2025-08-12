import { TestBed } from '@angular/core/testing';
import { ThemeService } from './toggle-theme';



describe('ToggleTheme', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
