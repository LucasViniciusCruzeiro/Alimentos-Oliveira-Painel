import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { Operation } from 'app/shared/enums/operation';
import { ViewInterface } from 'app/shared/interfaces/view.interface';
import { VehicleType } from 'app/shared/models/vehicle-type.model';
import { SwalService } from 'app/shared/services/swal.service';
import { VehicleTypeService } from 'app/shared/services/vehicle-type.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { FilterType, Filter } from 'app/shared/components/several-components/filter/filter-type';
import { data } from '../../access-profiles/mock/data';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {
  title = 'Tipo de Veículos';
  operation: Operation = Operation.INDEX;
  options = {};
  filters = null;

  filterOrder: Filter = this.refreshFilter();

  configuration: Config = new Config([
    {
      displayedColumn: 'factory',
      columnRef: 'factory',
      nameColumn: 'Fábrica',
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
      displayedColumn: 'quantityOfTheKit',
      columnRef: 'quantityOfTheKit',
      nameColumn: 'Quantidade do Conjunto',
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

  dataSource = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _vehicleTypeService: VehicleTypeService,
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
    this.subscription = this._vehicleTypeService.loadAll(this.options).subscribe((result: any) => {
      this._loadingService.hide();
      const vehicleTypes: VehicleType[] = result.data;
      this.configuration.total = result.size;

      this.dataSource = vehicleTypes.map(res => {
        const obj = {
          ...res,
          idFactory: res.factory.idFactory,
          factory: res.factory.name,
        };

        return obj;
      });
    });
  }

  refreshFilter(): Filter {
    return this.filterOrder = new Filter([
      {
        returnParam: 'quantityOfTheKit',
        valueField: 'id',
        displayField: 'description',
        label: 'Quantidade do Conjunto',
        type: FilterType.TYPE_SELECT,
        data: [
          {id: 1, description: '1'},
          {id: 2, description: '2'},
          {id: 3, description: '3'},
          {id: 4, description: '4'},
          {id: 5, description: '5'},
          {id: 6, description: '6'},
          {id: 7, description: '7'},
          {id: 8, description: '8'},
          {id: 9, description: '9'},
        ]
      }
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

  onView(val: VehicleType): void {
    this._router.navigate([`../${val.idVehicleType}/view`], { relativeTo: this._activatedRoute });
  }

  onUpdate(val: VehicleType): void {
    this._router.navigate([`../${val.idVehicleType}/edit`], { relativeTo: this._activatedRoute });
  }

  onDelete(value): void {
    this._swalService.confirm('Deseja realmente efetuar a operação de exclusão?').then(response => {
      if (response.dismiss) {
        return ;
      } else {
        this._loadingService.show();
        this.subscription = this._vehicleTypeService.destroy(value.idVehicleType).subscribe(data => {
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
