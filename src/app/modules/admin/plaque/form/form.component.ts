import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'app/shared/enums/operation';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { FactoryService } from 'app/shared/services/factory.service';
import { PlaqueService } from 'app/shared/services/plaque.service';
import { ShippingCompanyService } from 'app/shared/services/shipping-company.service';
import { SwalService } from 'app/shared/services/swal.service';
import { UtilsService } from 'app/shared/services/utils.service';
import { Subscription } from 'rxjs';
import { VehicleTypeService } from 'app/shared/services/vehicle-type.service';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, FormInterface, OnDestroy {
  title: string;
  id: number;
  item: any;
  operation: Operation = Operation.NEW;
  form: FormGroup;
  subscription: Subscription;

  factories = [];
  shippingCompanies = [];
  vehicleTypes = [];

  productType = [
    { id: 1, value: 'SOLUCAO', description: 'Solução' },
    { id: 2, value: 'SUSPENSAO', description: 'Suspensão' },
    { id: 3, value: 'AMBOS', description: 'Ambos' },
  ];

  registrationType = [
    { id: 1, value: 'VEICULO', description: 'Veículo' },
    { id: 2, value: 'TANQUE', description: 'Tanque' },
  ];

  vehicleType = [
  ];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _utilsService: UtilsService,
    private _plaqueService: PlaqueService,
    private _factoryService: FactoryService,
    private _shippingCompanyService: ShippingCompanyService,
    private _vehicleTypeService: VehicleTypeService,
    private _loadingService: LoadingService
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.getFactories();
    this.getShippingCompanies();
    this.getVehicleTypes();
    this.fillForm();
  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando Placa de Veículo e Tanque' : 'Visualizando Placa de Veículo e Tanque';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Placa de Veículo e Tanque';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      idPlaque: new FormControl({ value: null, disabled: true }),
      idFactory: new FormControl(null, Validators.required),
      idShippingCompany: new FormControl(null, Validators.required),
      plaque: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      numberOfMouths: new FormControl(null),
      shakingModel: new FormControl(null),
      productType: new FormControl(null, Validators.required),
      registrationType: new FormControl(null, Validators.required),
      tankCapacity: new FormControl(null),
      idVehicleType: new FormControl(null, Validators.required),
      active: new FormControl(true, Validators.required),
    });
  }

  getFactories(): void {
    this._factoryService.loadAll().subscribe((result: any) => {
      this.factories = result.data;
    });
  }

  getShippingCompanies(): void {
    this._shippingCompanyService.loadAll().subscribe((result: any) => {
      this.shippingCompanies = result.data;
    });
  }

  getVehicleTypes(): void {
    this._vehicleTypeService.loadAll().subscribe((result: any) => {
      this.vehicleTypes = result.data;
      this._loadingService.hide();
    });
  }

  fillForm(): void {
    if (this.operation !== Operation.NEW) {
      this.subscription = this._plaqueService.loadOne(Number(this.id)).subscribe((data: any) => {
        data.idFactory = data.factory.idFactory;
        data.idShippingCompany = data.shippingCompany.idShippingCompany;
        data.idVehicleType = data.vehicleType.idVehicleType;
        data.tankCapacity = data.tankCapacity.toString();
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

      let { tankCapacity } = this.form.value;

      tankCapacity = this._utilsService.formatDecimalValues(tankCapacity, 3);

      const obj = {
        ...this.form.value,
        tankCapacity
      };

      if (this.operation === Operation.NEW) {
        this._plaqueService.create(obj).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação.');
        });
      } else {
        this._plaqueService.update(this.id, obj).subscribe(data => {
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
