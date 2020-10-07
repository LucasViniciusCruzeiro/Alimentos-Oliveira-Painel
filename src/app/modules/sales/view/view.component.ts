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
import { SalesService } from 'app/shared/services/sales.service';
import { Sales } from 'app/shared/models/sales.model';
import { ClientService } from 'app/shared/services/client.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {
  title = 'Vendas';
  operation: Operation = Operation.INDEX;
  options = {};
  filters = null;
  filterOrder: Filter = this.refreshFilter();
  configuration: Config = new Config([
    {
      displayedColumn: 'salesDate',
      columnRef: 'salesDate',
      nameColumn: 'Data da Venda',
      type: Column.TYPE_COMMOM,
      sorted: false
    },
    {
      displayedColumn: 'clientName',
      columnRef: 'client',
      nameColumn: 'Cliente',
      type: Column.TYPE_COMMOM,
      sorted: false
    },
    {
      displayedColumn: 'city',
      columnRef: 'city',
      nameColumn: 'Cidade',
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
      displayedColumn: 'actions',
      columnRef: 'actions',
      nameColumn: 'Ações',
      type: Column.TYPE_ACTIONS,
      sorted: false
    },
  ], 0);

  subscription: Subscription;
  iconName = 'shopping_cart';

  dataSource = [];
  clients = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _salesService: SalesService,
    private _loadingService: LoadingService,
    private _clientService: ClientService,
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    this.onRefresh();
    this.getClient();
  }

  onRefresh(params?: any): void {
    this.options = { ...this.options, ...params };
    this.subscription = this._salesService.loadAll(this.options).subscribe((result: any) => {
      const sales: Sales[] = result.data;
      this.configuration.total = result.size;
      this.dataSource = sales.map(res => {
        const obj = {
          ...res,
          salesDate: res.dateSales ? moment(res.dateSales).format('DD/MM/YYYY') : '-',
          clientName: res.client.name,
          productName: res.product.name,
          city: `${res.client.city.name} - ${res.client.city.state.name}`,
        };
        this._loadingService.hide();
        return obj;
      });
    }, (error) => {
      this._loadingService.hide();
      this._swalService.error('Ops', error.error.message);
    });
  }

  getClient(): void {
    this.subscription = this._clientService.loadAll().subscribe((result: any) => {
      this.clients = result.data;
      this.refreshFilter();
    }, (error) => {
      this._loadingService.hide();
      this._swalService.error('Ops', error.error.message);
    });
  }

  refreshFilter(): Filter {
    return this.filterOrder = new Filter([
      {
        returnParam: 'idClient',
        valueField: 'idClient',
        displayField: 'name',
        label: 'Cliente',
        type: FilterType.TYPE_SELECT,
        data: this.clients
      },
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

  onView(sales: Sales): void {
    this._router.navigate([`../${sales.idSales}/view`], { relativeTo: this._activatedRoute });
  }

  onUpdate(sales: Sales): void {
    this._router.navigate([`../${sales.idSales}/edit`], { relativeTo: this._activatedRoute });
  }

  onDelete(value: Sales): void {
    this._swalService.confirm('Deseja realmente efetuar a operação de exclusão desta venda?').then(response => {
      if (response.dismiss) {
        return ;
      } else {
        this._loadingService.show();
        this.subscription = this._salesService.destroy(value.idSales).subscribe(data => {
          this._loadingService.hide();
          this.onRefresh();
          this._swalService.success('Operação realizada com sucesso.');
        }, (error) => {
          this._loadingService.hide();
          this._swalService.error('Ops', 'Falha ao realizar a operação.');
        });
      }
    });
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
