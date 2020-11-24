import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { Operation } from 'app/shared/enums/operation';
import { ViewInterface } from 'app/shared/interfaces/view.interface';
import { SwalService } from 'app/shared/services/swal.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { CityService } from 'app/shared/services/city.service';
import { City } from 'app/shared/models/city.model';
import { cloneDeep } from 'lodash';
import { ExportDataInterface } from 'app/shared/interfaces/export-data.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {
  title = 'Cidades';
  operation: Operation = Operation.INDEX;
  dataToExport: ExportDataInterface = { columns: [], data: [] };
  options = {};
  filters = null;

  configuration: Config = new Config([
    {
      displayedColumn: 'name',
      columnRef: 'name',
      nameColumn: 'Descrição',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'state',
      columnRef: 'state',
      nameColumn: 'Estado',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
  ], 0);

  subscription: Subscription;
  iconName = 'location_city';

  dataSource = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _cityService: CityService,
    private _loadingService: LoadingService
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    this.onRefresh();
    this.refreshFilter();
  }

  onRefresh(params?: any): void {
    this.options = { ...this.options, ...params };
    this.subscription = this._cityService.loadAll(this.options).subscribe((result: any) => {
      this._loadingService.hide();
      const city: City[] = result.data;
      this.configuration.total = result.size;
      this.dataSource = city.map(res => {
        const obj = {
          ...res,
          state: res.state.name,
        };
        return obj;
      });

      this.formatDataToExport();
    }, (error) => {
      this._loadingService.hide();
      this._swalService.error('Ops', error.error.message);
    });
  }

  formatDataToExport(): void {
    const formattedDataValues = cloneDeep(this.dataSource);

    formattedDataValues.map(row => {
      return row;
    });

    this.dataToExport = {
      columns: [
        { title: 'Descrição', dataKey: 'name' },
        { title: 'Estado', dataKey: 'state' },
      ],
      data: formattedDataValues
    };
  }

  refreshFilter(): void {
  }

  onFilter(value): void {
    this.options = { ...this.options, ...value };
    this.onRefresh(this.options);
  }

  onCancel(): void {
    this._router.navigate([`../`], { relativeTo: this._activatedRoute });
  }

  onClickRow(): void {

  }

  onView(prod: City): void {
    this._router.navigate([`../${prod.idCity}/view`], { relativeTo: this._activatedRoute });
  }

  onUpdate(prod: City): void {
    this._router.navigate([`../${prod.idCity}/edit`], { relativeTo: this._activatedRoute });
  }

  onDelete(value): void {
  }

  onSearch(search): void {
    this.options = { ...this.options, search };
    this.onRefresh(this.options);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
