import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aside } from './aside';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Aside', () => {
  let component: Aside;
  let fixture: ComponentFixture<Aside>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aside],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }), // mockea params o lo que uses
            snapshot: {
              paramMap: {
                get: () => '123'
              }
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Aside);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
