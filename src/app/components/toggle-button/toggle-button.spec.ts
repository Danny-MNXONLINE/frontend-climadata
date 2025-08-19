import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleButton } from './toggle-button';
import { ThemeService } from '../../services/toggleTheme/toggle-theme';

describe('ToggleButton', () => {
  let component: ToggleButton;
  let fixture: ComponentFixture<ToggleButton>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleButton]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToggleButton);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleTheme on themeService when toggleTheme is called', () => {
    spyOn(themeService, 'toggleTheme');
    component.toggleTheme();
    expect(themeService.toggleTheme).toHaveBeenCalled();
  });
});
