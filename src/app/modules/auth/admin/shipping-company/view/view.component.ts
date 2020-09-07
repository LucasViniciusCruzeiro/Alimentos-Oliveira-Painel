import { Component, OnDestroy, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { ViewInterface } from 'app/shared/interfaces/view.interface';
import { Operation } from 'app/shared/enums/operation';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalService } from 'app/shared/services/swal.service';
import { ShippingCompanyService } from 'app/shared/services/shipping-company.service';
import { ShippingCompany } from 'app/shared/models/shipping-company.model';
import { PersonType } from 'app/shared/enums/personType';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
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
  title = 'Transportadoras';
  operation: Operation = Operation.INDEX;
  subscription: Subscription;
  filters = null;
  dataSource = [];
  states = [];
  cities = [];

  filterOrder: Filter = this.refreshFilter();
  
  options = {};
  iconName = 'local_shipping';
  configuration = new Config([
    {
      displayedColumn: 'factoryName',
      columnRef: 'factoryName',
      nameColumn: 'Fábrica',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'name',
      columnRef: 'name',
      nameColumn: 'Nome Transportadora',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'cityName',
      columnRef: 'cityName',
      nameColumn: 'Cidade',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'stateName',
      columnRef: 'stateName',
      nameColumn: 'Estado',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'typePerson',
      columnRef: 'typePerson',
      nameColumn: 'Tipo Pessoa',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'document',
      columnRef: 'document',
      nameColumn: 'CPF/CNPJ',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: '',
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
    private _shippingCompanyService: ShippingCompanyService,
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
    this.subscription = this._shippingCompanyService.loadAll(this.options).subscribe((result: any) => {
      this._loadingService.hide();
      const shippingCompanies: ShippingCompany[] = result.data;
      this.configuration.total = result.size;
      this.dataSource = shippingCompanies.map(res => {
        const obj = {
          ...res,
          factoryName: res.factory.name,
          cityName: res.city.name,
          stateName: res.city.state.name,
          typePerson: PersonType[res.personType],
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
        returnParam: 'personType',
        valueField: 'id',
        displayField: 'description',
        label: 'Tipo de Pessoa',
        type: FilterType.TYPE_SELECT,
        data: [
          {id: 'F', description: 'Pessoa Física'}, {id: 'J', description: 'Pessoa Jurídica'}
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

  onUpdate(item: ShippingCompany): void {
    this._router.navigate([`../${item.idShippingCompany}/edit`], {relativeTo: this._activatedRoute});
  }

  onView(item: ShippingCompany): void {
    this._router.navigate([`../${item.idShippingCompany}/view`], {relativeTo: this._activatedRoute});
  }

  onSearch(search): void {
    this.options = { ...this.options, search };
    this.onRefresh(this.options);
  }

  onClickRow(): void { }

  onCancel(): void { }

  onDelete(value: ShippingCompany): void {
    this._swalService.confirm('Deseja realmente efetuar a operação de exclusão?').then(response => {
      if (response.dismiss) {
        return ;
      } else {
        this._loadingService.show();
        this.subscription = this._shippingCompanyService.destroy(value.idShippingCompany).subscribe(data => {
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
