import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatetimepickerComponent } from './input-datetimepicker.component';

describe('InputDatetimepickerComponent', () => {
  let component: InputDatetimepickerComponent;
  let fixture: ComponentFixture<InputDatetimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDatetimepickerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDatetimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
