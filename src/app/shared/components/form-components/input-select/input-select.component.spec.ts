import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'app/shared/material/material.module';

import { ErrorsComponent } from '../errors/errors.component';
import { InputSelectComponent } from './input-select.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

describe('InputSelectComponent', () => {
  let component: InputSelectComponent;
  let fixture: ComponentFixture<InputSelectComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputSelectComponent, ErrorsComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MaterialModule,
        NgxMatSelectSearchModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSelectComponent);
    component = fixture.componentInstance;

    component.formcontrolname = 'inputText';
    component.formGroup = formBuilder.group({
      inputText: new FormControl(1)
    });

    component.iconName = 'person';
    component.label = 'Nome';
    component.data = [
      { id: 1, description: 'teste1' },
      { id: 2, description: 'teste2' },
      { id: 3, description: 'teste3' },
      { id: 4, description: 'teste4' },
      { id: 5, description: 'teste5' }
    ];
    component.displayField = 'description';
    component.searchField = 'description';
    component.valueField = 'id';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
