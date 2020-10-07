import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fuseAnimations } from 'app/shared/animations';
import { Operation } from 'app/shared/enums/operation';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() iconName: string;
  @Input() operation: Operation;
  @Input() formGroup: FormGroup;

  @Input() isRefresh = true;
  @Input() isAdded = true;
  @Input() isFilter = true;
  @Input() isSearch = true;
  @Input() isReturn = true;
  @Input() labelButton = 'ADICIONAR';
  @Input() config;

  @Output() refresh = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() filter = new EventEmitter();

  searchInput: FormControl;
  hold = '';

  constructor() {
    this.searchInput = new FormControl();
  }

  onPickUpValue(): void {
    const value = this.searchInput.value;

    if (value[0] === ' ') {
      this.searchInput.setValue('');
    }
  }

  onValidationSpace(event): boolean {
    const keypress = event.key;

    if (keypress === ' ' && this.hold === ' ') {
      return false;
    }
    this.hold = keypress;
  }

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(debounceTime(200)).subscribe(
      value => this.search.emit(value));
  }

  onRefresh(): void {
    this.refresh.emit();
  }

  onSave(): void {
    this.save.emit();
  }

  onUpdate(): void {
    this.update.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onFilter(value): void {
    this.filter.emit(value);
  }

}
