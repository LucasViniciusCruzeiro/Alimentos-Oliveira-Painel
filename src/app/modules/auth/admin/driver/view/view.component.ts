import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { Operation } from 'app/shared/enums/operation';
import { SwalService } from 'app/shared/services/swal.service';
import { Subscription } from 'rxjs';
import { DriverService } from 'app/shared/services/driver.service';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { ViewInterface } from 'app/shared/interfaces/view.interface';
import { Filter, FilterType } from 'app/shared/components/several-components/filter/filter-type';
import { StateService } from 'app/shared/services/state.service';
import { CityService } from 'app/shared/services/city.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  animations: fuseAnimations,
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {

  title = 'Motoristas';
  iconName = 'drive_eta';
  filters = null;

  options = {};
  operation: Operation = Operation.INDEX;
  subscription: Subscription;
  states = [];
  cities = [];
  dataSource = [];

  filterOrder: Filter = this.refreshFilter();

  configuration = new Config([
    {
      displayedColumn: 'active',
      columnRef: 'active',
      nameColumn: 'Ativo',
      type: Column.TYPE_STATUS,
      sorted: true
    },
    {
      displayedColumn: 'name',
      columnRef: 'name',
      nameColumn: 'Nome',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'factory',
      columnRef: 'factory',
      nameColumn: 'Fábrica',
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
    {
      displayedColumn: 'city',
      columnRef: 'city',
      nameColumn: 'Cidade',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'cpf',
      columnRef: 'cpf',
      nameColumn: 'CPF',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'email',
      columnRef: 'email',
      nameColumn: 'e-mail',
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

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _driverService: DriverService,
    private _loadingService: LoadingService,
    private _stateService: StateService,
    private _cityService: CityService
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    const pagination = { pageIndex: 0, pageSize: 10 };
    this.onRefresh(pagination);
    this.getStates();
    this.getCities();
  }

  onRefresh(params?): void {
    this.options = { ...this.options, ...params };
    this.subscription = this._driverService.loadAll(this.options).subscribe((result: any) => {
      this._loadingService.hide();
      result.data = result.data.map(item => {
        item.idFactory = item.factory.idFactory;
        item.factory = item.factory.name;
        item.state = item.city.state.name;
        item.idCity = item.city.idCity;
        item.city = item.city.name;
        return item;
      });
      
      this.configuration.total = result.size;
      this.dataSource = result.data;
    });
  }

  getStates(): void {
    this.subscription = this._stateService.loadAll().subscribe((result: any) => {
      this._loadingService.hide();
      this.states = result.data;
      this.refreshFilter();
    });
  }

  getCities(): void {
    this.subscription = this._cityService.loadAll().subscribe((result: any) => {
      this._loadingService.hide();
      this.cities = result.data;
      this.refreshFilter();
    });
  }

  refreshFilter(): Filter {
    return this.filterOrder = new Filter([
      {
        returnParam: 'active',
        valueField: 'id',
        displayField: 'description',
        label: 'Ativo/Inativo',
        type: FilterType.TYPE_SELECT,
        data: [
          {id: 0, description: 'Inativo'}, {id: 1, description: 'Ativo'}
        ]
      },
      {
        returnParam: 'state',
        valueField: 'idState',
        displayField: 'name',
        label: 'Estado',
        type: FilterType.TYPE_SELECT,
        data: this.states
      },
      {
        returnParam: 'city',
        valueField: 'idCity',
        displayField: 'name',
        label: 'Cidade',
        type: FilterType.TYPE_SELECT,
        data: this.cities
      },
    ]);
  }

  changeStatus(value): void {
    let msg: string;
    msg = value.active ? 'Deseja realmente efetuar a operação de ativação desse motorista?'
      : 'Deseja realmente efetuar a operação de inativação desse motorista?';
    this._swalService.confirm(msg).then(response => {
      if (response.dismiss) {
        this.dataSource = this.dataSource.map((item, index) => {
          if (item.idDriver === value.idDriver) {
            item.active = value.active ? false : true;
          }
          return item;
        });
      } else {
        this._loadingService.show();
        value.active = value.active ? true : false;
        this.subscription = this._driverService.update(value.idDriver, value).subscribe(data => {
          this._loadingService.hide();
          this._swalService.success('Operação realizada com sucesso.');
        }, (error) => {
          this._loadingService.hide();
          this._swalService.error('Ops', 'Falha ao realizar a operação');
        });
      }
    });
  }

  onFilter(value): void {
    this.options = { ...this.options, ...value };
    this.onRefresh(this.options);
  }

  onSearch(search): void {
    this.options = { ...this.options, search };
    this.onRefresh(this.options);
  }

  onClickRow(): void { }

  update(item): void {
    this._router.navigate([`../${item.idDriver}/edit`], { relativeTo: this._activatedRoute });
  }

  view(item): void {
    this._router.navigate([`../${item.idDriver}/view`], { relativeTo: this._activatedRoute });
  }

  delete(): void { }


  onCancel(): void { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
