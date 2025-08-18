import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Landing } from './landing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
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
        }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
