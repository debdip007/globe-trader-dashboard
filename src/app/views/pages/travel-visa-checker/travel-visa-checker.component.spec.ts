import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelVisaCheckerComponent } from './travel-visa-checker.component';

describe('TravelVisaCheckerComponent', () => {
  let component: TravelVisaCheckerComponent;
  let fixture: ComponentFixture<TravelVisaCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelVisaCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelVisaCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
