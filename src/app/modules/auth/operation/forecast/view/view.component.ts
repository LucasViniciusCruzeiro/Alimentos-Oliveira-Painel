import { Component, OnDestroy, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewInterface } from 'app/shared/interfaces/view.interface';
import { Operation } from 'app/shared/enums/operation';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { CheckListItems } from 'app/shared/models/checklist-item.model';
import { FactoryService } from 'app/shared/services/factory.service';
import { Forecasts } from 'app/shared/models/forecast.model';
import { ForecastService } from 'app/shared/services/forecast.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  animations: fuseAnimations
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {

  title =' ForeCast';
  iconName = 'assignment';

  operation: Operation = Operation.INDEX;
  subscription: Subscription;
  options = {};
  dataSource = [];
  factories = [];

  configuration = new Config([
    {
      displayedColumn: 'dailyLoadCapacity',
      columnRef: 'dailyLoadCapacity',
      nameColumn: 'Capacidade Diária de Carga',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'dailyTonCapacity',
      columnRef: 'dailyTonCapacity',
      nameColumn: 'Capacidade Diária em Toneladas',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'initialDate',
      columnRef: 'initialDate',
      nameColumn: 'Data Inicial',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'finalDate',
      columnRef: 'finalDate',
      nameColumn: 'Data Final',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'actions',
      columnRef: 'actions',
      nameColumn: 'Ações',
      type: Column.TYPE_ACTIONS,
      sorted: false
    }
  ], 0);

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _forecastService: ForecastService,
    private _loadingService: LoadingService,
    private _factoryService: FactoryService
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    const pagination = { pageIndex: 0, pageSize: 10};
    this.onRefresh(pagination);
    this.getFactories();
  }

  onRefresh(params?): void {
    this.options = { ...this.options, ...params };
    this.subscription = this._forecastService.loadAll(this.options).subscribe((result: any) => {
      this._loadingService.hide();
      const forecast: Forecasts[] = result.data;
      this.configuration.total = result.size;
      this.dataSource = forecast.map(res => {
        const obj = {
          ...res,
          idFactory: res.factory.idFactory,
          factory: res.factory.name
        };
        return obj;
      });
    });
  }

  getFactories(): void {
    const active = { active: 1};
    this.subscription = this._factoryService.loadAll(active).subscribe((result: any) => {
      this._loadingService.hide();
      this.factories = result.data;
    });
  }

  onClickRow(): void { }

  onUpdate(item: Forecasts): void {
    this._router.navigate([`../${item.idForecast}/edit`], { relativeTo: this._activatedRoute });
  }

  onView(item: Forecasts): void {
    this._router.navigate([`../${item.idForecast}/view`], { relativeTo: this._activatedRoute });
  }

  onDelete(item: Forecasts): void { }

  onCancel(): void { }

  onSearch(): void { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
