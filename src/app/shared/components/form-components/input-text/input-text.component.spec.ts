import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MaterialModule } from 'app/shared/material/material.module';

import { ErrorsComponent } from '../errors/errors.component';
import { InputTextComponent } from './input-text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        InputTextComponent,
        ErrorsComponent
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MaterialModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;

    component.formcontrolname = 'inputText';
    component.formGroup = formBuilder.group({
      inputText: new FormControl('test message', [Validators.required])
    });

    component.iconName = 'person';
    component.label = 'Nome';
    component.placeholder = 'Nome';
    component.maxLength = 60;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
