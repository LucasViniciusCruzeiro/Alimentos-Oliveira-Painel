import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'app/shared/enums/operation';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { SwalService } from 'app/shared/services/swal.service';
import { UtilsService } from 'app/shared/services/utils.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { FactoryService } from 'app/shared/services/factory.service';
import { ForecastService } from 'app/shared/services/forecast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, FormInterface, OnDestroy {

  title: string;
  iconName = 'assignment';

  id: number;
  item: any;
  operation: Operation;
  form: FormGroup;
  subscription: Subscription;

  factories: [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _swalService: SwalService,
    private _forecastService: ForecastService,
    private _loadingService: LoadingService,
    private _factoryService: FactoryService
  ) {
    this._loadingService.show();
   }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.fillForm();
    this.getFactories();
  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id as number;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando ForeCast' : 'Visualizando ForeCast';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo ForeCast';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      idForecasts: new FormControl({ value: null, disabled: true }),
      idFactory: new FormControl(null, Validators.required),
      dailyLoadCapacity: new FormControl(null, Validators.required),
      dailyTonCapacity: new FormControl(null, Validators.required),
      initialDate: new FormControl(null, Validators.required),
      finalDate: new FormControl(null)
    });
  }

  getFactories(): void {
    const active = { active: 1};
    this.subscription = this._factoryService.loadAll(active).subscribe((response: any) => {
      this.factories = response.data;
      this._loadingService.hide();
    });
  }

  fillForm(): void {
    if (this.operation !== Operation.NEW) {
      this.subscription = this._forecastService.loadOne(this.id).subscribe((data: any) => {
        data.idFactory = data.factory.idFactory;
        data.dailyTonCapacity = data.dailyTonCapacity.toString();
        this.form.patchValue(data);
        this._loadingService.hide();
      });
    }

    if (this.operation === Operation.VIEW) {
      this.form.disable();
    }
  }

  onSave(): void {
    if (this._utilsService.formIsValid(this.form)) {

      let { initialDate, finalDate, dailyTonCapacity } = this.form.value;

      initialDate = moment(initialDate).format('YYYY-MM-DD');
      finalDate = moment(finalDate).format('YYYY-MM-DD');
      dailyTonCapacity = this._utilsService.formatDecimalValues(dailyTonCapacity, 3);
      
      const obj = {
        ...this.form.value,
        initialDate,
        finalDate,
        dailyTonCapacity
      };

      if (this.operation === Operation.NEW) {
        this._forecastService.create(obj).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação.');
        });

      } else {
        this._forecastService.update(this.id, obj).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação.');
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
