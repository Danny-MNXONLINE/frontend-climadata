import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [],
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
