import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRadioGroupComponent } from './input-radio-group.component';

describe('InputRadioGroupComponent', () => {
  let component: InputRadioGroupComponent;
  let fixture: ComponentFixture<InputRadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRadioGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
