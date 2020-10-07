import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberLatitudeLongitudeComponent } from './input-number-latitude-longitude.component';

describe('InputNumberLatitudeLongitudeComponent', () => {
  let component: InputNumberLatitudeLongitudeComponent;
  let fixture: ComponentFixture<InputNumberLatitudeLongitudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputNumberLatitudeLongitudeComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumberLatitudeLongitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
