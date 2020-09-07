import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;
  
  @Input() label: string;
  @Input() placeholder: string;
  @Input() min: number;
  @Input() max: number;

  constructor(
    private _utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    if (this.min || this.max) {
      this.onChange();
    }
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  onChange(): void {
    this.formGroup.get(this.formcontrolname).valueChanges.subscribe(data => {
      if (data > this.max) {
        this.formGroup.get(this.formcontrolname).setValue(this.max);
      }

      if (data < this.min) {
        this.formGroup.get(this.formcontrolname).setValue(this.min);
      }
    });
  }
}
