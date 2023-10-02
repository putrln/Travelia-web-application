import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsMenagerComponent } from './trips-menager.component';

describe('TripsMenagerComponent', () => {
  let component: TripsMenagerComponent;
  let fixture: ComponentFixture<TripsMenagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsMenagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsMenagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
