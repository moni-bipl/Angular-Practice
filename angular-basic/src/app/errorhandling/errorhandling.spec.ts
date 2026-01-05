import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Errorhandling } from './errorhandling';

describe('Errorhandling', () => {
  let component: Errorhandling;
  let fixture: ComponentFixture<Errorhandling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Errorhandling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Errorhandling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
