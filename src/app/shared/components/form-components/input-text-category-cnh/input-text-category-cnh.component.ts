import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-input-text-category-cnh',
  templateUrl: './input-text-category-cnh.component.html',
  styleUrls: ['./input-text-category-cnh.component.scss']
})
export class InputTextCategoryCnhComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() placeholder = 'Categoria da CNH';
  @Input() label = 'Categoria da CNH';
  @Input() iconName: string;
  @Input() maxLength: number;

  mask = '';
  formated = false;
  
  constructor(
    private _utilsService: UtilsService
  ) { }

  ngOnInit(): void {
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  onChange(value) {
    if ((value.length === 2) || (this.formated === true)) {
      this.formated = false;
      return this.mask = 'SS';
    } else {
      if (value.length === 1) {
        this.formated = true;
      }
      return this.mask = 'S';
    }
  }
} 
