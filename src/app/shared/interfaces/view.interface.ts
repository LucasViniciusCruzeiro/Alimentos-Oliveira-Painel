import { Config } from 'app/shared/components/several-components/data-table/config';
import { Subscription } from 'rxjs';

import { Operation } from '../enums/operation';

export interface ViewInterface {
  title: string;
  iconName: string;
  operation: Operation;
  dataSource: any[];
  subscription: Subscription;
  configuration: Config;

  onRefresh(params?: any): void;
  onCancel(): void;
  onClickRow(row: any): void;
  onSearch(value: any): void;
}
