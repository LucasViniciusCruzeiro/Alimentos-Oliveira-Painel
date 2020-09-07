import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MaterialModule } from 'app/shared/material/material.module';

import { ErrorsComponent } from '../errors/errors.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextCpfCnpjComponent } from './input-text-cpf-cnpj.component';

describe('InputTextCpfCnpjComponent', () => {
  let component: InputTextCpfCnpjComponent;
  let fixture: ComponentFixture<InputTextCpfCnpjComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        InputTextCpfCnpjComponent,
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
    fixture = TestBed.createComponent(InputTextCpfCnpjComponent);
    component = fixture.componentInstance;

    component.formcontrolname = 'inputTextCpfCnpj';
    component.formGroup = formBuilder.group({
      inputTextCpfCnpj: new FormControl('test message', [Validators.required])
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
