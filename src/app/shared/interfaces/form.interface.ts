import { FormGroup } from '@angular/forms';

import { Operation } from '../enums/operation';
import { Subscription } from 'rxjs';

export interface FormInterface {
  title: string;
  id: string | number;
  item: any;
  operation: Operation;
  form: FormGroup;
  subscription: Subscription;

  setOperation(): void;
  createForm(): void;
  fillForm(): void;
  onSave(): void;
  onCancel(): void;
}
