import { Component, OnDestroy, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Column } from 'app/shared/components/several-components/data-table/column';
import { Config } from 'app/shared/components/several-components/data-table/config';
import { ViewInterface } from 'app/shared/interfaces/view.interface';
import { Operation } from 'app/shared/enums/operation';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalService } from 'app/shared/services/swal.service';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/shared/models/user.model';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { Filter, FilterType } from 'app/shared/components/several-components/filter/filter-type';
import { ShippingCompanyService } from 'app/shared/services/shipping-company.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  animations: fuseAnimations,
})
export class ViewComponent implements OnInit, ViewInterface, OnDestroy {
  title = 'Usuários';
  operation: Operation = Operation.INDEX;
  subscription: Subscription;
  filters = null;
  shippingCompanies = [];
  states = [];
  cities = [];

  filterOrder: Filter = this.refreshFilter();

  options = {};
  iconName = 'person';
  configuration = new Config([
    {
      displayedColumn: 'active',
      columnRef: 'active',
      nameColumn: 'Ativo',
      type: Column.TYPE_STATUS,
      sorted: true
    },
    {
      displayedColumn: 'factories',
      columnRef: 'factories',
      nameColumn: 'Fábrica',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'username',
      columnRef: 'username',
      nameColumn: 'Nome do Usuário',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'email',
      columnRef: 'email',
      nameColumn: 'E-mail',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'sector',
      columnRef: 'sector',
      nameColumn: 'Setor',
      type: Column.TYPE_COMMOM,
      sorted: true
    },
    {
      displayedColumn: 'shippingCompanyName',
      columnRef: 'shippingCompanyName',
      nameColumn: 'Transportadora',
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

  dataSource = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _userService: UserService,
    private _loadingService: LoadingService,
    private _shippingCompanyService: ShippingCompanyService
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    const pagination = { pageIndex: 0, pageSize: 10 };
    this.onRefresh(pagination);
    this.getShippingCompany();
  }

  onRefresh(params?): void {
    this.options = { ...this.options, ...params };
    this.subscription = this._userService.loadAll(this.options).subscribe((result: any) => {
      this._loadingService.hide();
      const users: User[] = result.data;
      this.configuration.total = result.size;
      this.dataSource = users.map(res => {
        const obj = {
          ...res,
          shippingCompanyName: res.shippingCompany ? res.shippingCompany.name : ' - ',
          idShippingCompanyName: res.shippingCompany ? res.shippingCompany.name : ' - '
        };
        return obj;
      });
    });
  }

  getShippingCompany(): void {
    this.subscription = this._shippingCompanyService.loadAll().subscribe((result: any) => {
      this._loadingService.hide();
      this.shippingCompanies = result.data;
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
        returnParam: 'shippingCompany',
        valueField: 'idShippingCompany',
        displayField: 'name',
        label: 'Transportadora',
        type: FilterType.TYPE_SELECT,
        data: this.shippingCompanies
      },
    ]);
  }

  onChangeStatus(value): void {
    let msg: string;
    msg = value.active === 1 ? 'Deseja realmente efetuar a operação de ativação desse usuário?'
      : 'Deseja realmente efetuar a operação de inativação desse usuário?';
      
    this._swalService.confirm(msg).then(response => {
      if (response.dismiss) {
        this.dataSource = this.dataSource.map((item, index) => {
          if (item.idUser === value.idUser) {
            item.active = value.active ? false : true;
          }
          return item;
        });
      } else {
        this._loadingService.show();
        value.active = value.active ? true : false;
        this.subscription = this._userService.update(value.idUser, value).subscribe(data => {
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

  onUpdate(item: User): void {
    this._router.navigate([`../${item.idUser}/edit`], {relativeTo: this._activatedRoute});
  }

  onView(item: User): void {
    this._router.navigate([`../${item.idUser}/view`], {relativeTo: this._activatedRoute});
  }

  onSearch(search): void {
    this.options = { ...this.options, search };
    this.onRefresh(this.options);
  }

  onClickRow(): void { }

  onCancel(): void { }

  onDelete(): void { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
