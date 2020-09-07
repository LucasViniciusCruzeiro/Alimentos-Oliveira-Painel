import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { fuseAnimations } from 'app/shared/animations';
import { Operation } from 'app/shared/enums/operation';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() iconName: string;
  @Input() operation: Operation;
  @Input() formGroup: FormGroup;

  @Input() isFilter = true;
  @Input() isSearch = true;
  @Input() config;

  @Output() save = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() filter = new EventEmitter();

  searchInput: FormControl;

  constructor() {
    this.searchInput = new FormControl();
  }

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(debounceTime(200)).subscribe(
      value => this.search.emit(value));
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
