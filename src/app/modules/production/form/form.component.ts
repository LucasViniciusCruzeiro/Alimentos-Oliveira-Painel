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
  ingredients;
  ingredientsSelected;
  dtInitial = moment().format('DD/MM/YYYY');
  operation: Operation = Operation.NEW;
  form: FormGroup;
  subscription: Subscription;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _utilsService: UtilsService,
    private _ingredientsService: IngredientsService,
    private _productionService: ProductionService,
    private _loadingService: LoadingService,
    private _productService: ProductService,
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.getProduct();
    this.getIngredients();
    this.fillForm();
  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando Produção' : 'Visualizando Produção';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Produção';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      idProduction: new FormControl({ value: null, disabled: true }),
      idIngredients: new FormControl(null, Validators.required),
      idProduct: new FormControl(null, Validators.required),
      dateProduction: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });
  }

  fillForm(): void {
    if (this.operation !== Operation.NEW) {
      this.subscription = this._productionService.loadOne(Number(this.id)).subscribe((data: any) => {
        this.ingredientsSelected = [];
        data.idProduct = data.product.idProduct;
        data.ingredients.forEach(element => {
          this.ingredientsSelected.push(
            element.idIngredients
          );
        });
        data.idIngredients = this.ingredientsSelected;
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

  getIngredients(): void {
    this.subscription = this._ingredientsService.loadAll().subscribe((result: any) => {
      this._loadingService.hide();
      this.ingredients = result.data;
    }, (error) => {
      this._loadingService.hide();
      this._swalService.error('Ops', error.error.message);
    });
  }

  onSave(): void {
    if (this._utilsService.formIsValid(this.form)) {
      let { dateProduction } = this.form.value;
      dateProduction = moment(dateProduction).format('YYYY-MM-DD');
      const obj = {
        ...this.form.value,
        dateProduction
      };
      if (this.operation === Operation.NEW) {
        this._productionService.create(obj).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação.');
        });
      } else {
        this._productionService.update(this.id, obj).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', error.error.error.message);
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
