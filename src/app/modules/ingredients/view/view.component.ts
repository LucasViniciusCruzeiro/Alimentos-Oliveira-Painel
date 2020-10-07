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
import { IngredientsService } from 'app/shared/services/ingredients.service';
import { Ingredients } from 'app/shared/models/ingredients.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {
  title = 'Tipos de Ingredientes';
  operation: Operation = Operation.INDEX;
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
      displayedColumn: 'value',
      columnRef: 'value',
      nameColumn: 'Valor',
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
  iconName = 'art_track';

  dataSource = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _ingredientsService: IngredientsService,
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
    this.subscription = this._ingredientsService.loadAll(this.options).subscribe((result: any) => {
      this._loadingService.hide();
      const product: Product[] = result.data;
      this.configuration.total = result.size;
      this.dataSource = product.map(res => {
        const obj = {
          ...res,
        };
        return obj;
      });
    }, (error) => {
      this._loadingService.hide();
      this._swalService.error('Ops', error.error.message);
    });
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

  onView(ingre: Ingredients): void {
    this._router.navigate([`../${ingre.idIngredients}/view`], { relativeTo: this._activatedRoute });
  }

  onUpdate(ingre: Ingredients): void {
    this._router.navigate([`../${ingre.idIngredients}/edit`], { relativeTo: this._activatedRoute });
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
