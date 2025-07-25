import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAq } from './panel-aq';

describe('PanelAq', () => {
  let component: PanelAq;
  let fixture: ComponentFixture<PanelAq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAq]
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
