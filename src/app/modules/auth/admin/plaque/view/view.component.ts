import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { Operation } from 'app/shared/enums/operation';
import { ViewInterface } from 'app/shared/interfaces/view.interface';
import { Plaque } from 'app/shared/models/plaque.model';
import { PlaqueService } from 'app/shared/services/plaque.service';
import { SwalService } from 'app/shared/services/swal.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { Filter, FilterType } from 'app/shared/components/several-components/filter/filter-type';
import { FactoryService } from 'app/shared/services/factory.service';
import { ShippingCompanyService } from 'app/shared/services/shipping-company.service';
import { VehicleTypeService } from 'app/shared/services/vehicle-type.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {
  title = 'Placas de Veículos e Tanques';
  operation: Operation = Operation.INDEX;
  factories = [];
  shippingCompanies = [];
  vehicleTypes = [];
  
  filterOrder: Filter = this.refreshFilter();

  configuration: Config = new Config([
    {
      displayedColumn: 'active',
      columnRef: 'active',
      nameColumn: 'Ativo',
      type: Column.TYPE_STATUS,
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
      displayedColumn: 'shippingCompany',
      columnRef: 'shippingCompany',
      nameColumn: 'Transportadora',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'plaque',
      columnRef: 'plaque',
      nameColumn: 'Placa',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'description',
      columnRef: 'description',
      nameColumn: 'Descrição',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'vehicleType',
      columnRef: 'vehicleType',
      nameColumn: 'Tipo de Veículo',
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
  iconName = 'directions_car';
  options = {};

  dataSource = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _loadingService: LoadingService,
    private _plaqueService: PlaqueService,
    private _factoryService: FactoryService,
    private _shippingCompanyService: ShippingCompanyService,
    private _vehicleTypeService: VehicleTypeService
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    const pagination = { pageIndex: 0, pageSize: 10 };
    this.onRefresh(pagination);
    this.getFactories();
    this.getShippingCompanies();
    this.getVehicleTypes();
  }
  
  onRefresh(params?): void {
    this.options = { ...this.options, ...params };
    this.subscription = this._plaqueService.loadAll(this.options).subscribe((result: any) => {
      this._loadingService.hide();
      const plaques: Plaque[] = result.data;
      this.configuration.total = result.size;
      this.dataSource = plaques.map(res => {
        const obj = {
          ...res,
          idFactory: res.factory.idFactory,
          factory: res.factory.name,
          idShippingCompany: res.shippingCompany.idShippingCompany,
          shippingCompany: res.shippingCompany.name,
          idVehicleType: res.vehicleType.idVehicleType,
          vehicleType: res.vehicleType.description,
        };

        return obj;
      });
    });
  }

  getFactories(): void {
    const active = { active: 1 };
    this.subscription = this._factoryService.loadAll(active).subscribe((result: any) => {
      this._loadingService.hide();
      this.factories = result.data;
      this.refreshFilter();
    });
  }

  getShippingCompanies(): void {
    this.subscription = this._shippingCompanyService.loadAll().subscribe((result: any) => {
      this._loadingService.hide();
      this.shippingCompanies = result.data;
      this.refreshFilter();
    });
  }

  getVehicleTypes(): void {
    this.subscription = this._vehicleTypeService.loadAll().subscribe((result: any) => {
      this._loadingService.hide();
      this.vehicleTypes = result.data;
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
        returnParam: 'factory',
        valueField: 'idFactory',
        displayField: 'name',
        label: 'Fábrica',
        type: FilterType.TYPE_SELECT,
        data: this.factories
      },
      {
        returnParam: 'shippingCompany',
        valueField: 'idShippingCompany',
        displayField: 'name',
        label: 'Transportadora',
        type: FilterType.TYPE_SELECT,
        data: this.shippingCompanies
      },
      {
        returnParam: 'vehicleType',
        valueField: 'idVehicleType',
        displayField: 'description',
        label: 'Tipo Veículo',
        type: FilterType.TYPE_SELECT,
        data: this.vehicleTypes
      },
    ]);
  }

  onFilter(value): void {
    this.options = { ...this.options, ...value };
    this.onRefresh(this.options);
  }

  onChangeStatus(value): void {
    let msg: string;
    msg = value.active ? 'Deseja realmente efetuar a operação de ativação dessa placa?'
      : 'Deseja realmente efetuar a operação de inativação dessa placa?';
      
    this._swalService.confirm(msg).then(response => {
      if (response.dismiss) {
        this.dataSource = this.dataSource.map((item, index) => {
          if (item.idPlaque === value.idPlaque) {
            item.active = value.active ? false : true;
          }
          return item;
        });
      } else {
        this._loadingService.show();
        value.active = value.active ? true : false;
        this.subscription = this._plaqueService.update(value.idPlaque, value).subscribe(data => {
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

  onUpdate(item: Plaque): void {
    this._router.navigate([`../${item.idPlaque}/edit`], { relativeTo: this._activatedRoute });
  }

  onView(item: Plaque): void {
    this._router.navigate([`../${item.idPlaque}/view`], { relativeTo: this._activatedRoute });
  }

  onDelete(item: Plaque): void { }

  onCancel(): void { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
