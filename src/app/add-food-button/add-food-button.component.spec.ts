import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodButtonComponent } from './add-food-button.component';

describe('AddFoodButtonComponent', () => {
  let component: AddFoodButtonComponent;
  let fixture: ComponentFixture<AddFoodButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFoodButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
