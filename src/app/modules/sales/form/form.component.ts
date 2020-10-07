import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'app/shared/enums/operation';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { SwalService } from 'app/shared/services/swal.service';
import { UtilsService } from 'app/shared/services/utils.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { IngredientsService } from 'app/shared/services/ingredients.service';
import * as moment from 'moment';
import { ProductService } from 'app/shared/services/product.service';
import { ProductionService } from 'app/shared/services/production.service';
import { SalesService } from 'app/shared/services/sales.service';
import { ClientService } from 'app/shared/services/client.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, FormInterface, OnDestroy {
  title: string;
  id: number;
  item: any;
  products;
  clients;
  dtInitial = moment().format('DD/MM/YYYY');
  operation: Operation = Operation.NEW;
  form: FormGroup;
  subscription: Subscription;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _utilsService: UtilsService,
    private _clientService: ClientService,
    private _salesService: SalesService,
    private _loadingService: LoadingService,
    private _productService: ProductService,
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.getProduct();
    this.getClients();
    this.fillForm();
  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando Venda' : 'Visualizando Venda';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Venda';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      idSales: new FormControl({ value: null, disabled: true }),
      idClient: new FormControl(null, Validators.required),
      idProduct: new FormControl(null, Validators.required),
      dateSales: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });
  }

  fillForm(): void {
    if (this.operation !== Operation.NEW) {
      this.subscription = this._salesService.loadOne(Number(this.id)).subscribe((data: any) => {
        data.idProduct = data.product.idProduct;
        data.idClient = data.client.idClient;
        this.form.patchValue(data);
      });
      if (this.operation === Operation.VIEW) {
        this.form.disable();
      }
    }
    setTimeout(() => this._loadingService.hide(), 700);
  }

  getProduct(): void {
    this.subscription = this._productService.loadAll().subscribe((result: any) => {
      this._loadingService.hide();
      this.products = result.data;
    }, (error) => {
      this._loadingService.hide();
      this._swalService.error('Ops', error.error.message);
    });
  }

  getClients(): void {
    this.subscription = this._clientService.loadAll().subscribe((result: any) => {
      this._loadingService.hide();
      this.clients = result.data;
    }, (error) => {
      this._loadingService.hide();
      this._swalService.error('Ops', error.error.message);
    });
  }

  onSave(): void {
    if (this._utilsService.formIsValid(this.form)) {
      console.log(this.form.value);
      let { dateSales } = this.form.value;
      dateSales = moment(dateSales).format('YYYY-MM-DD');
      const obj = {
        ...this.form.value,
        dateSales
      };
      delete obj.value;
      console.log(obj);
      if (this.operation === Operation.NEW) {
        this._salesService.create(obj).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          console.log(error);
          this._swalService.error('Ops', error.error.error.message);
        });
      } else {
        this._salesService.update(this.id, obj).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', error.error.message);
        });
      }
    }
  }

  navigate(): void {
    let destiny = '../../';

    if (this.operation === Operation.NEW) {
      destiny = '../';
    }

    this._router.navigate([destiny], {
      relativeTo: this._activatedRoute
    });
  }

  onCancel(): void {
    this.navigate();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
