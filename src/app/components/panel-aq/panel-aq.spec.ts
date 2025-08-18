import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelAq } from './panel-aq';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PanelAq', () => {
  let component: PanelAq;
  let fixture: ComponentFixture<PanelAq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAq],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelAq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
