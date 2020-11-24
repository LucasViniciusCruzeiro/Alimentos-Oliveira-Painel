import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { Operation } from 'app/shared/enums/operation';
import { ViewInterface } from 'app/shared/interfaces/view.interface';
import { SwalService } from 'app/shared/services/swal.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { Product } from 'app/shared/models/product.model';
import { Ingredients } from 'app/shared/models/ingredients.model';
import { ProductionService } from 'app/shared/services/production.service';
import { Production } from 'app/shared/models/production.model';
import * as moment from 'moment';
import { Filter, FilterType } from 'app/shared/components/several-components/filter/filter-type';
import { ExportDataInterface } from 'app/shared/interfaces/export-data.interface';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {
  title = 'Produção';
  operation: Operation = Operation.INDEX;
  dataToExport: ExportDataInterface = { columns: [], data: [] };
  options = {};
  filters = null;
  filterOrder: Filter = this.refreshFilter();
  configuration: Config = new Config([
    {
      displayedColumn: 'productionDate',
      columnRef: 'productionDate',
      nameColumn: 'Data de Produção',
      type: Column.TYPE_COMMOM,
      sorted: false
    },
    {
      displayedColumn: 'productName',
      columnRef: 'productName',
      nameColumn: 'Produto',
      type: Column.TYPE_COMMOM,
      sorted: false
    },
    {
      displayedColumn: 'amount',
      columnRef: 'amount',
      nameColumn: 'Quantidade',
      type: Column.TYPE_COMMOM,
      sorted: false
    },
    {
      displayedColumn: 'value',
      columnRef: 'value',
      nameColumn: 'Valor',
      type: Column.TYPE_COMMOM,
      sorted: false
    },
    {
      displayedColumn: 'actions',
      columnRef: 'actions',
      nameColumn: 'Ações',
      type: Column.TYPE_ACTIONS,
      sorted: false
    },
  ], 0);

  subscription: Subscription;
  iconName = 'event_note';

  dataSource = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _productionService: ProductionService,
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
    this.subscription = this._productionService.loadAll(this.options).subscribe((result: any) => {
      const production: Production[] = result.data;
      this.configuration.total = result.size;
      this.dataSource = production.map(res => {
        const obj = {
          ...res,
          productionDate: res.dateProduction ? moment(res.dateProduction).format('DD/MM/YYYY') : '-',
          productName: res.product ? res.product.name : '-',
          value: res.value + ' R$'
        };
        this._loadingService.hide();
        setTimeout(() => {
          this.formatDataToExport();
        }, 900);
        return obj;
      });
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
        { title: 'Data de Produção', dataKey: 'productionDate' },
        { title: 'Produto', dataKey: 'productName' },
        { title: 'Quantidade', dataKey: 'amount' },
        { title: 'Valor', dataKey: 'value' },
      ],
      data: formattedDataValues
    };
  }

  refreshFilter(): Filter {
    return this.filterOrder = new Filter([
      {
        returnParam: 'DTPRODUCINITIAL',
        label: 'Data Produção Inicial',
        type: FilterType.TYPE_DATE,
      }, {
        returnParam: 'DTPRODUCFINAL',
        label: 'Data Produção Final',
        type: FilterType.TYPE_DATE,
      },
    ]);
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

  onView(ingre: Production): void {
    this._router.navigate([`../${ingre.idProduction}/view`], { relativeTo: this._activatedRoute });
  }

  onUpdate(ingre: Production): void {
    this._router.navigate([`../${ingre.idProduction}/edit`], { relativeTo: this._activatedRoute });
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
