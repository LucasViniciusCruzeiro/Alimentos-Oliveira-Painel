import { Component, OnDestroy, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { Subscription } from 'rxjs/internal/Subscription';
import { SwalService } from 'app/shared/services/swal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewInterface } from 'app/shared/interfaces/view.interface';
import { Operation } from 'app/shared/enums/operation';
import { CheckListType } from 'app/shared/enums/checklistType';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { FilterType, Filter } from 'app/shared/components/several-components/filter/filter-type';
import { CheckListItemService } from 'app/shared/services/checklist-item.service';
import { CheckListItems } from 'app/shared/models/checklist-item.model';
import { Required } from 'app/shared/enums/required';
import { FactoryService } from 'app/shared/services/factory.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  animations: fuseAnimations
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy{


  title = 'Itens do CheckList';
  iconName = 'assignment';
  filters = null;

  operation: Operation = Operation.INDEX;
  subscription: Subscription;
  options = {};
  dataSource = [];
  factories = [];

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
      displayedColumn: 'factory',
      columnRef: 'factory',
      nameColumn: 'Fábrica',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'typeChecklist',
      columnRef: 'typeChecklist',
      nameColumn: 'Tipo',
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
      displayedColumn: 'required',
      columnRef: 'required',
      nameColumn: 'Obrigatório',
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
    private _checklistItemService: CheckListItemService,
    private _loadingService: LoadingService,
    private _factoryService: FactoryService

  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    const pagination = { pageIndex: 0, pageSize: 10};
    this.onRefresh(pagination);
    this.refreshFilter();
    this.getFactories();
  }

  onRefresh(params?): void {
    this.options = { ...this.options, ...params };
    this.subscription = this._checklistItemService.loadAll(this.options).subscribe((result: any) => {
      this._loadingService.hide();
      const checklistItem: CheckListItems[] = result.data;
      this.configuration.total = result.size;
      this.dataSource = checklistItem.map(res => {
        const obj = {
          ...res,
          typeChecklist: CheckListType[res.type],
          required : Required[res.required.toString()],
          idFactory: res.factory.idFactory,
          factory: res.factory.name,
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
        label: 'Fábricas Ativa',
        type: FilterType.TYPE_SELECT,
        data: this.factories
      },
      {
        returnParam: 'type',
        valueField: 'id',
        displayField: 'description',
        label: 'Avaliação do Condutor/Condições do veículo',
        type: FilterType.TYPE_SELECT,
        data: [
          {id: 'A', description: 'Avaliação do Condutor'}, {id: 'C', description: 'Condições do veículo'}
        ]
      },
      {
        returnParam: 'required',
        valueField: 'id',
        displayField: 'description',
        label: 'Obrigatório Sim/Não',
        type: FilterType.TYPE_SELECT,
        data: [
          {id: '1', description: 'Sim'}, {id: '0', description: 'Não'}
        ]
      }
    ]);
  }

  onFilter(value): void {
    this.options = { ...this.options, ...value };
    this.onRefresh(this.options);
  }

  onChangeStatus(value): void {
    let msg: string;
    msg = value.active ? 'Deseja realmente efetuar a operação de ativação desse Check-List?'
      : 'Deseja realmente efetuar a operação de inativação desse Check-List?';
    this._swalService.confirm(msg).then(response => {
      if (response.dismiss) {
        this.dataSource = this.dataSource.map((item, index) => {
          if (item.idCheckListItem === value.idCheckListItem) {
            item.active = value.active ? false : true;
          }
          return item;
        });
      } else {
        this._loadingService.show();
        value.active = value.active ? true : false;
        this.subscription = this._checklistItemService.update(value.idCheckListItem, value).subscribe(data => {
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

  onUpdate(item: CheckListItems): void {
    this._router.navigate([`../${item.idCheckListItem}/edit`], { relativeTo: this._activatedRoute });
  }

  onView(item: CheckListItems): void {
    this._router.navigate([`../${item.idCheckListItem}/view`], { relativeTo: this._activatedRoute });
  }

  onDelete(item: CheckListItems): void { }

  onCancel(): void { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
