import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { Operation } from 'app/shared/enums/operation';
import { ViewInterface } from 'app/shared/interfaces/view.interface';
import { SwalService } from 'app/shared/services/swal.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { ClientService } from 'app/shared/services/client.service';
import { Client } from 'app/shared/models/client.model';
import { cloneDeep } from 'lodash';
import { ExportDataInterface } from 'app/shared/interfaces/export-data.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {
  title = 'Clientes';
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
      displayedColumn: 'phoneNumber',
      columnRef: 'phoneNumber',
      nameColumn: 'Telefone Celular',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'Email',
      columnRef: 'email',
      nameColumn: 'Email',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'phoneFix',
      columnRef: 'phoneFix',
      nameColumn: 'Telefone Fixo',
      type: Column.TYPE_COMMOM,
      sorted: true
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
  iconName = 'contact_mail';

  dataSource = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _clientService: ClientService,
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
    this.subscription = this._clientService.loadAll(this.options).subscribe((result: any) => {
      this._loadingService.hide();
      const client: Client[] = result.data;
      this.configuration.total = result.size;
      this.dataSource = client.map(res => {
        const obj = {
          phoneFix: res.fixPhone ? res.fixPhone : '-',
          Email: res.email ? res.email : '-',
          ...res,
        };
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
        { title: 'Descrição', dataKey: 'name' },
        { title: 'Telefone Celular', dataKey: 'phoneNumber' },
        { title: 'Email', dataKey: 'email' },
        { title: 'Telefone Fixo', dataKey: 'fixPhone' },
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

  onView(ingre: Client): void {
    this._router.navigate([`../${ingre.idClient}/view`], { relativeTo: this._activatedRoute });
  }

  onUpdate(ingre: Client): void {
    this._router.navigate([`../${ingre.idClient}/edit`], { relativeTo: this._activatedRoute });
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
