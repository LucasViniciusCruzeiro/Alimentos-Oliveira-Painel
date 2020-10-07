import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-input-toggle',
  templateUrl: './input-toggle.component.html',
  styleUrls: ['./input-toggle.component.scss'],
})
export class InputToggleComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;
  @Input() label;
  @Input() disabled;
  @Output() changeValue = new EventEmitter();

  constructor(
    private _utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
  }

  onChangeValue(event): void {
    this.changeValue.emit(event);
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }
}
