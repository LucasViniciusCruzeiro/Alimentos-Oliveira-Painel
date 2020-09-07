import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'app/shared/enums/operation';
import { SwalService } from 'app/shared/services/swal.service';
import { UtilsService } from 'app/shared/services/utils.service';
import { Subscription } from 'rxjs';
import { DocumentValidator } from 'app/shared/validators/documentValidator';
import { DriverService } from 'app/shared/services/driver.service';
import { StateService } from 'app/shared/services/state.service';
import { CityService } from 'app/shared/services/city.service';
import { FactoryService } from 'app/shared/services/factory.service';
import { CnhValidator } from 'app/shared/validators/cnhValidator';
import { CategoryCnhValidator } from 'app/shared/validators/categoryCnhValidator';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import * as moment from 'moment';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, FormInterface, OnDestroy{
  title: string;
  id: number;
  item: any;

  states = [];
  cities = [];
  factories = [];
  cleanInput = true;
  operation: Operation = Operation.NEW;
  form: FormGroup;
  subscription: Subscription;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _swalService: SwalService,
    private _driverService: DriverService,
    private _stateService: StateService,
    private _cityService: CityService,
    private _factoryService: FactoryService,
    private _loadingService: LoadingService
  ) {
    this._loadingService.show();
   }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.fillForm();
    this.getStates();
    this.getFactories();
  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id as number;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando Motorista' : 'Visualizando Motorista';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Motorista';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      idDriver: new FormControl(null),
      idFactory: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      neighborhood: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      idCity: new FormControl(null, Validators.required),
      idState: new FormControl(null, Validators.required),
      cpf: new FormControl(null, [Validators.required, DocumentValidator]),
      email: new FormControl(null),
      birthDate: new FormControl(null, Validators.required),
      cnh: new FormControl(null, [Validators.required, CnhValidator]),
      dateValidity: new FormControl(null, Validators.required),
      category: new FormControl(null, [Validators.required, CategoryCnhValidator]),
      phoneNumber: new FormControl(null),
      cellPhoneNumber: new FormControl(null, Validators.required)
    });

  }

  getFactories(): void {
    const active = { active: 1 };
    this.subscription = this._factoryService.loadAll(active).subscribe((response: any) => {
      this.factories = response.data;
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
      this.subscription = this._driverService.loadOne(this.id).subscribe((data: any) => {
        data.idFactory = data.factory.idFactory;
        data.idCity = data.city.idCity;
        data.idState = data.city.state.idState;
        this.form.patchValue(data);
        this.getStates();
        this._loadingService.hide();
      });
    }

    if (this.operation === Operation.VIEW) {
      this.cleanInput = false;
      this.form.disable();
    }
  }

  onSave(): void {
    if (this._utilsService.formIsValid(this.form)) {
      let formValue = this.form.value;
      delete formValue.state;
      formValue.birthDate = moment(this.form.value.birthDate).format('YYYY-MM-DD');
      formValue.dateValidity = moment(this.form.value.dateValidity).format('YYYY-MM-DD');
      if (this.operation === Operation.NEW) {
        this._driverService.create(formValue).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(response => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação');
        });

      } else {
        this._driverService.update(this.id, formValue).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(response => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação');
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
