import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'app/shared/enums/operation';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { CityService } from 'app/shared/services/city.service';
import { FactoryService } from 'app/shared/services/factory.service';
import { StateService } from 'app/shared/services/state.service';
import { SwalService } from 'app/shared/services/swal.service';
import { UtilsService } from 'app/shared/services/utils.service';
import { DocumentValidator } from 'app/shared/validators/documentValidator';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, FormInterface, OnDestroy {
  title: string;
  iconName = 'business';

  id: number;
  item: any;

  cities = [
    { id: 1, value: 'Uberaba' },
    { id: 2, value: 'Belo Horizonte' },
    { id: 3, value: 'Uberlândia' },
  ];

  states = [
    { id: 1, value: 'MG', description: 'Minas Gerais' }
  ];

  operation: Operation;
  form: FormGroup;
  subscription: Subscription;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _swalService: SwalService,
    private _factoryService: FactoryService,
    private _stateService: StateService,
    private _cityService: CityService,
    private _loadingService: LoadingService
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
      this.title = this.operation === Operation.EDIT ? 'Alterando Fábrica' : 'Visualizando Fábrica';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Fábrica';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      idFactory: new FormControl({ value: null, disabled: true }),
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      neighborhood: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      idState: new FormControl(null, Validators.required),
      idCity: new FormControl(null, Validators.required),
      cnpj: new FormControl(null, [Validators.required, DocumentValidator]),
      latitude: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
      perimeter: new FormControl(null, Validators.required)
    });
  }

  getStates(): void {
    if (this.operation === Operation.NEW) {
      this.form.controls['idCity'].disable();
    }

    this.subscription = this._stateService.loadAll().subscribe((res: any) => {
      this.states = res.data;
      this._loadingService.hide();
    });

    if (this.operation !== Operation.NEW) {
      const state = { ['state']: this.form.value.idState };
      this.getCities(state);
    }
  }

  getCities(state): void {
    if (this.operation === Operation.NEW) {
      this.form.controls['idCity'].enable();
    }

    this.subscription = this._cityService.loadAll(state).subscribe((res: any) => {
      this.cities = res.data;
    });
  }

  onSelectState(event): void {
    const state = { ['state']: event.value };
    this.getCities(state);
  }

  fillForm(): void {
    if (this.operation !== Operation.NEW) {
      this.subscription = this._factoryService.loadOne(this.id).subscribe((data: any) => {
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

  onSave(): void {
    if (this._utilsService.formIsValid(this.form)) {

      let { latitude, longitude, perimeter } = this.form.value;

      latitude = latitude.toString();
      latitude.replace(',', '.');
      longitude = longitude.toString();
      longitude.replace(',', '.');
      perimeter = perimeter.toString();
      perimeter.replace(',', '.');

      const obj = {
        ...this.form.value,
        latitude,
        longitude,
        perimeter
      };
      
      if (this.operation === Operation.NEW) {
        this._factoryService.create(obj).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação.');
        });

      } else {
        this._factoryService.update(this.id, obj).subscribe(data => {
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
