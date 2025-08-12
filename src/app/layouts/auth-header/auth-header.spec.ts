import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthHeader } from './auth-header';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthHeader', () => {
  let component: AuthHeader;
  let fixture: ComponentFixture<AuthHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthHeader, provideHttpClientTesting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
