import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { Subscription } from 'rxjs';

import { data } from './../mock/data';
import { SwalService } from 'app/shared/services/swal.service';
import { Operation } from 'app/shared/enums/operation';
import { ViewInterface } from 'app/shared/interfaces/view.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {
  title = 'Perfis de Acesso';
  iconName = 'assignment_ind';
  operation: Operation = Operation.INDEX;
  dataSource;
  subscription: Subscription;
  configuration = new Config([
    {
      displayedColumn: 'factory',
      columnRef: 'factory',
      nameColumn: 'Fábrica',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'profileName',
      columnRef: 'profileName',
      nameColumn: 'Nome do Perfil',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'screens',
      columnRef: 'screens',
      nameColumn: 'Telas',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: '',
      columnRef: 'actions',
      nameColumn: 'Ações',
      type: Column.TYPE_ACTIONS,
      sorted: true
    },
  ], 0);

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh(): void {
    this.dataSource = data;
  }

  onCancel(): void {
    this._router.navigate([`../`], {
      relativeTo: this._activatedRoute
    });
  }

  onClickRow(): void {
    
  }

  onView(val): void {
    this._router.navigate([`../${val.id}/view`], {
      relativeTo: this._activatedRoute
    });
  }

  onUpdate(val): void {
    this._router.navigate([`../${val.id}/edit`], {
      relativeTo: this._activatedRoute
    });
  }

  onDelete(val): void {
    this._swalService.success('Operação realizada com sucesso.');
  }

  onSearch(value): void {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
