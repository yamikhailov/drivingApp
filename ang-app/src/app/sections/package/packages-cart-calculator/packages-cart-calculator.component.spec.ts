import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesCartCalculatorComponent } from './packages-cart-calculator.component';

describe('PackagesCartCalculatorComponent', () => {
  let component: PackagesCartCalculatorComponent;
  let fixture: ComponentFixture<PackagesCartCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagesCartCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesCartCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
