import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-input-tag',
  templateUrl: './input-tag.component.html',
  styleUrls: ['./input-tag.component.scss'],
})
export class InputTagComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() data: any[];
  @Input() placeholder = '+ uma tag';

  @Input() backgroundColor = 'lightblue';
  @Input() wordColor = 'black';

  value: string;

  @ViewChild('tagInput', null) tagInputRef: ElementRef;

  constructor(
    private _utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.data = this.formGroup.get(this.formcontrolname).value;
    this.formGroup.get(this.formcontrolname).setValue('');
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.value;
    if (event.code === 'Comma' || event.code === 'Space' || event.code === 'Enter') {
      this.addTag(inputValue);
      this.setFormValue();
      this.value = '';
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }

    let exist = null;
    exist = this.data.find(item => item === tag);

    if (tag.length > 0 && !exist) {
      this.data.push(tag);
    }
  }

  removeTag(tag?: string): void {
    if (tag) {
      this.data = this.data.filter(item => item !== tag);
    }
    this.setFormValue();
  }

  setFormValue() {
    this.formGroup.get(this.formcontrolname).setValue(this.data);
  }

  checkRequired() {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

}
