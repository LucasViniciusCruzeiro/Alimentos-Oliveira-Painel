import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { Operation } from 'app/shared/enums/operation';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { CityService } from 'app/shared/services/city.service';
import { ClientService } from 'app/shared/services/client.service';
import { FactoryService } from 'app/shared/services/factory.service';
import { ShippingCompanyService } from 'app/shared/services/shipping-company.service';
import { StateService } from 'app/shared/services/state.service';
import { SwalService } from 'app/shared/services/swal.service';
import { UtilsService } from 'app/shared/services/utils.service';
import { DocumentValidator } from 'app/shared/validators/documentValidator';
import { emailValidator } from 'app/shared/validators/emailValidator';
import { ZipCodeValidator } from 'app/shared/validators/zipCodeValidator';
import { Subscription } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, FormInterface, OnDestroy {
  title: string;
  id: number;
  item: any;
  operation: Operation = Operation.NEW;
  form: FormGroup;
  subscription: Subscription;
  mask: string;
  doc: string;

  states = [];
  cities = [];
  factories = [];

  personType = [
    { id: 'F', description: 'Pessoa Física' },
    { id: 'J', description: 'Pessoa Jurídica' },
  ];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _swalService: SwalService,
    private _clientService: ClientService,
    private _cityService: CityService,
    private _stateService: StateService,
    private _loadingService: LoadingService,
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.getStates();
    this.fillForm();
  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id as number;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando Cliente' : 'Visualizando Cliente';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Cliente';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      idClient: new FormControl({ value: null, disabled: true }),
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      neighborhood: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, [Validators.required, ZipCodeValidator]),
      idCity: new FormControl(null, Validators.required),
      idState: new FormControl(null, Validators.required),
      personType: new FormControl(null, Validators.required),
      document: new FormControl(null, [Validators.required, DocumentValidator]),
      email: new FormControl(null, emailValidator),
      fixPhone: new FormControl(null),
      phoneNumber: new FormControl(null, Validators.required),
    });
  }

  getStates(): void {
    if (this.operation === Operation.NEW) {
      this.form.controls['idCity'].disable();
    }

    this.subscription = this._stateService.loadAll().subscribe((response: any) => {
      this.states = response.data;

      if (this.operation === 'NEW') {
        this._loadingService.hide();
      }
    }, (error) => {
      this._loadingService.hide();
      this._swalService.error('Ops', error.error.message);
    });

    if (this.operation !== Operation.NEW && this.form.controls.idCity.value) {
      this.getCities(this.form.value.idState);
    }
  }

  onSelectState(event): void {
    this.form.controls['idCity'].setValue(null);
    this.getCities(event.value);
  }

  getCities(value): void {
    const state = { ['state']: value };
    this.subscription = this._cityService.loadAll(state).subscribe((response: any) => {
      this.cities = response.data;
    }, (error) => {
      this._loadingService.hide();
      this._swalService.error('Ops', error.error.message);
    });

    if (this.operation === Operation.NEW) {
      this.form.controls['idCity'].enable();
    }
  }

  fillForm(): void {
    if (this.operation !== Operation.NEW) {
      this.subscription = this._clientService.loadOne(Number(this.id)).subscribe((data: any) => {
        data.idCity = data.city.idCity;
        data.idState = data.city.state.idState;

        this.getCities(data.idState);
        setTimeout(() => this.form.controls.idCity.setValue(data.idCity), 700);
        this.form.patchValue(data);
        this._loadingService.hide();
      }, (error) => {
        this._loadingService.hide();
        this._swalService.error('Ops', error.error.message);
      });
    }

    if (this.operation === Operation.VIEW) {
      this.form.disable();
    }
  }

  verifyDocument(form): boolean {
    if (form.document.value.length !== 11 && form.personType.value === 'F') {
      this.doc = 'CPF';
      return false;
    } else if (form.document.value.length !== 14 && form.personType.value === 'J') {
      this.doc = 'CNPJ';
      return false;
    }
    return true;
  }

  onSave(): void {
    if (this._utilsService.formIsValid(this.form) && this.verifyDocument(this.form.controls)) {
      this._loadingService.show();
      if (this.operation === Operation.NEW) {
        this._clientService.create(this.form.value).subscribe(data => {
          this._loadingService.hide();
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._loadingService.hide();
          this._swalService.error('Ops', error.error.message);
        });
      } else {
        this._clientService.update(this.id, this.form.value).subscribe(data => {
          this._loadingService.hide();
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._loadingService.hide();
          this._swalService.error('Ops', error.error.message);
        });
      }
    } else if ((this.verifyDocument(this.form.controls) === false) && this._utilsService.formIsValid(this.form)) {
      this._swalService.error('Ops', this.doc + ' Invalido');
    }
  }

  navigate(): void {
    let destiny = '../../';

    if (this.operation === Operation.NEW) {
      destiny = '../';
    }

    this._router.navigate([destiny], {
      relativeTo: this._activatedRoute,
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
