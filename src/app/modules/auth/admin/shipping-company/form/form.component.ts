import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { Operation } from 'app/shared/enums/operation';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SwalService } from 'app/shared/services/swal.service';
import { UtilsService } from 'app/shared/services/utils.service';
import { DocumentValidator } from 'app/shared/validators/documentValidator';
import { ZipCodeValidator } from 'app/shared/validators/zipCodeValidator';
import { CityService } from 'app/shared/services/city.service';
import { StateService } from 'app/shared/services/state.service';
import { ShippingCompanyService } from 'app/shared/services/shipping-company.service';
import { FactoryService } from 'app/shared/services/factory.service';
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
  typeDocument: any;
  mask: string;

  states = [];
  cities = [];
  factories = [];

  personType = [
    { id: 'F', description: 'Pessoa Física' },
    { id: 'J', description: 'Pessoa Jurídica' }
  ];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _swalService: SwalService,
    private _shippingCompanyService: ShippingCompanyService,
    private _cityService: CityService,
    private _stateService: StateService,
    private _factoryService: FactoryService,
    private _loadingService: LoadingService
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.getFactories();
    this.getStates();
    this.fillForm();
  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id as number;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando Transportadora' : 'Visualizando Transportadora';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Transportadora';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      idShippingCompany: new FormControl({ value: null, disabled: true }),
      idFactory: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      neighborhood: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, [Validators.required, ZipCodeValidator]),
      idCity: new FormControl(null, Validators.required),
      idState: new FormControl(null, Validators.required),
      personType: new FormControl(null, Validators.required),
      document: new FormControl(null, [Validators.required, DocumentValidator]),
      email: new FormControl(null),
      fixPhone: new FormControl(null),
      phoneNumber: new FormControl(null, Validators.required),
    });
  }

  getFactories(): void {
    const active = { active: 1 };
    this._factoryService.loadAll(active).subscribe((result: any) => {
      this.factories = result.data;
    });
  }

  getStates(): void {
    if (this.operation === Operation.NEW) {
      this.form.controls['idCity'].disable();
    }

    this.subscription = this._stateService.loadAll().subscribe((response: any) => {
      this.states = response.data;
      this._loadingService.hide();
    });

    if (this.operation !== Operation.NEW) {
      const state = { ['state']: this.form.value.idState };
      this.getCities(state);
    }
  }

  onSelectState(event): void {
    const state = { ['state']: event.value };
    this.getCities(state);
  }

  getCities(state): void {
    if (this.operation === Operation.NEW) {
      this.form.controls['idCity'].enable();
    }

    this.subscription = this._cityService.loadAll(state).subscribe((response: any) => {
      this.cities = response.data;
    });
  }

  fillForm(): void {
    if (this.operation !== Operation.NEW) {
      this.subscription = this._shippingCompanyService.loadOne(Number(this.id)).subscribe((data: any) => {
        data.idFactory = data.factory.idFactory;
        data.idCity = data.city.idCity;
        data.idState = data.city.state.idState;
        this.form.patchValue(data);
        this.getStates();
        this._loadingService.hide();
      });
    }

    if (this.operation === Operation.VIEW) {
      this.form.disable();
    }
  }

  verifyDocument(form): boolean {
    if ((form.document.value.length === 11 && form.personType.value === 'F') ||
      (form.document.value.length === 14 && form.personType.value === 'J')) {
      return true;
    }
    return false;
  }

  onSave(): void {
    if (this._utilsService.formIsValid(this.form) && this.verifyDocument(this.form.controls)) {
      if (this.operation === Operation.NEW) {
        this._shippingCompanyService.create(this.form.value).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação.');
        });
      } else {
        this._shippingCompanyService.update(this.id, this.form.value).subscribe(data => {
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
