import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesCartComponent } from './packages-cart.component';

describe('PackagesCartComponent', () => {
  let component: PackagesCartComponent;
  let fixture: ComponentFixture<PackagesCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagesCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
