import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodMapComponent } from './food-map.component';

describe('FoodMapComponent', () => {
  let component: FoodMapComponent;
  let fixture: ComponentFixture<FoodMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
