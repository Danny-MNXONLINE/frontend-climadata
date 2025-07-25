import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContent } from './home-content';

describe('HomeContent', () => {
  let component: HomeContent;
  let fixture: ComponentFixture<HomeContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
