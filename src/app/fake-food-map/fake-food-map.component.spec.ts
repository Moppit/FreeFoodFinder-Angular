import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeFoodMapComponent } from './fake-food-map.component';

describe('FakeFoodMapComponent', () => {
  let component: FakeFoodMapComponent;
  let fixture: ComponentFixture<FakeFoodMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeFoodMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeFoodMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
