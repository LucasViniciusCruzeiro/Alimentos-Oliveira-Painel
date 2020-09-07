import { Component, OnDestroy, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalService } from 'app/shared/services/swal.service';
import { ViewInterface } from 'app/shared/interfaces/view.interface';
import { Operation } from 'app/shared/enums/operation';
import { FactoryService } from 'app/shared/services/factory.service';
import { Factory } from 'app/shared/models/factory.model';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { FilterType, Filter } from 'app/shared/components/several-components/filter/filter-type';
import { StateService } from 'app/shared/services/state.service';
import { CityService } from 'app/shared/services/city.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  animations: fuseAnimations
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {

  title = 'Fábricas';
  iconName = 'business';
  filters = null;
  states = [];
  cities = [];

  operation: Operation = Operation.INDEX;
  subscription: Subscription;
  options = {};
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
    private _factoryService: FactoryService,
    private _loadingService: LoadingService,
    private _stateService: StateService,
    private _cityService: CityService,
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
    this.subscription = this._factoryService.loadAll(this.options).subscribe((result: any) => {
      this._loadingService.hide();
      const factories: Factory[] = result.data;
      this.configuration.total = result.size;
      this.dataSource = factories.map(res => {
        const obj = {
          ...res,
          state: res.city.state.name,
          city: res.city.name,
          idCity: res.city.idCity,
        };

        return obj;
      });
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

  onFilter(value): void {
    this.options = { ...this.options, ...value };
    this.onRefresh(this.options);
  }

  onChangeStatus(value): void {
    let msg: string;
    msg = value.active ? 'Deseja realmente efetuar a operação de ativação dessa fábrica?'
      : 'Deseja realmente efetuar a operação de inativação dessa fábrica?';
      
    this._swalService.confirm(msg).then(response => {
      if (response.dismiss) {
        this.dataSource = this.dataSource.map((item, index) => {
          if (item.idFactory === value.idFactory) {
            item.active = value.active ? false : true;
          }
          return item;
        });
      } else {
        this._loadingService.show();
        value.active = value.active ? true : false;
        this.subscription = this._factoryService.update(value.idFactory, value).subscribe(data => {
          this._loadingService.hide();
          this._swalService.success('Operação realizada com sucesso.');
        }, (error) => {
          this._loadingService.hide();
          this._swalService.error('Ops', 'Falha ao realizar a operação');
        });
      }
    });
  }

  onSearch(search): void {
    this.options = { ...this.options, search };
    this.onRefresh(this.options);
  }

  onClickRow(): void { }

  onUpdate(item: Factory): void {
    this._router.navigate([`../${item.idFactory}/edit`], { relativeTo: this._activatedRoute });
  }

  onView(item: Factory): void {
    this._router.navigate([`../${item.idFactory}/view`], { relativeTo: this._activatedRoute });
  }

  onDelete(item: Factory): void { }

  onCancel(): void { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
