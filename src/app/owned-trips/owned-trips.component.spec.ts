import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedTripsComponent } from './owned-trips.component';

describe('OwnedTripsComponent', () => {
  let component: OwnedTripsComponent;
  let fixture: ComponentFixture<OwnedTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnedTripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
