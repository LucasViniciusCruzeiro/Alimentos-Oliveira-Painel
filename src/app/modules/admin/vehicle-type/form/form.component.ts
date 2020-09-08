import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'app/shared/enums/operation';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { SwalService } from 'app/shared/services/swal.service';
import { UtilsService } from 'app/shared/services/utils.service';
import { Subscription } from 'rxjs';
import { VehicleTypeService } from 'app/shared/services/vehicle-type.service';
import { FactoryService } from 'app/shared/services/factory.service';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, FormInterface, OnDestroy {
  title: string;
  id: string | number;
  item: any;
  operation: Operation = Operation.NEW;
  form: FormGroup;
  subscription: Subscription;

  factories = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _utilsService: UtilsService,
    private _vehicleTypeService: VehicleTypeService,
    private _factoryService: FactoryService,
    private _loadingService: LoadingService
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.getFactories();
    this.fillForm();
  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando Tipo de Veículo' : 'Visualizando Tipo de Veículo';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Tipo de Veículo';
    }
  }

  getFactories(): void {
    this.subscription = this._factoryService.loadAll().subscribe((result: any) => {
      this._loadingService.hide();
      this.factories = result.data;
    });
  }

  createForm(): void {
    this.form = new FormGroup({
      idVehicleType: new FormControl({ value: null, disabled: true }),
      idFactory: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      maximumWeightPerAxle: new FormControl(null),
      totalGrossPrice: new FormControl(null),
      totalGrossPriceTolerance: new FormControl(null),
      capacity: new FormControl(null),
      maxLength: new FormControl(null),
      quantityOfTheKit: new FormControl(null, Validators.required)
    });
  }

  fillForm(): void {
    if (this.operation !== Operation.NEW) {
      this.subscription = this._vehicleTypeService.loadOne(Number(this.id)).subscribe((data: any) => {
        this._loadingService.hide();
        data.idFactory = data.factory.idFactory;
        data.maximumWeightPerAxle = data.maximumWeightPerAxle.toString();
        data.totalGrossPrice = data.totalGrossPrice.toString();
        data.totalGrossPriceTolerance = data.totalGrossPriceTolerance.toString();
        data.capacity = data.capacity.toString();
        data.maxLength = data.maxLength.toString();

        this.form.patchValue(data);
      });
    }

    if (this.operation === Operation.VIEW) {
      this.form.disable();
    }
  }

  onSave(): void {
    if (this._utilsService.formIsValid(this.form)) {

      let { maximumWeightPerAxle, totalGrossPrice, totalGrossPriceTolerance, capacity, maxLength } = this.form.value;

      maximumWeightPerAxle = this._utilsService.formatDecimalValues(maximumWeightPerAxle, 3);
      totalGrossPrice = this._utilsService.formatDecimalValues(totalGrossPrice, 3);
      totalGrossPriceTolerance = this._utilsService.formatDecimalValues(totalGrossPriceTolerance, 3);
      capacity = this._utilsService.formatDecimalValues(capacity, 3);
      maxLength = this._utilsService.formatDecimalValues(maxLength, 1);

      const obj = {
        ...this.form.value,
        maximumWeightPerAxle,
        totalGrossPrice,
        totalGrossPriceTolerance,
        capacity,
        maxLength
      };

      if (this.operation === Operation.NEW) {
        this._vehicleTypeService.create(obj).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação.');
        });
      } else {
        this._vehicleTypeService.update(Number(this.id), obj).subscribe(data => {
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
