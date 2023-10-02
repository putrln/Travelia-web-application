import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromsComponent } from './froms.component';

describe('FromsComponent', () => {
  let component: FromsComponent;
  let fixture: ComponentFixture<FromsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
