import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-input-toggle',
  templateUrl: './input-toggle.component.html',
  styleUrls: ['./input-toggle.component.scss']
})
export class InputToggleComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label;

  constructor(
    private _utilsService: UtilsService
  ) { }

  ngOnInit() {
  }

  setValue(value) {
    this.formGroup.get(this.formcontrolname).setValue(value.checked ? 1 : 0);
  }

  checkRequired() {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }
}

