import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'app/shared/enums/operation';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { SwalService } from 'app/shared/services/swal.service';
import { UtilsService } from 'app/shared/services/utils.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { CityService } from 'app/shared/services/city.service';
import { State } from '@ngrx/store';
import { StateService } from 'app/shared/services/state.service';

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

  states = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _utilsService: UtilsService,
    private _cityService: CityService,
    private _loadingService: LoadingService,
    private _stateService: StateService,
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
    this.id = this._activatedRoute.snapshot.params.id;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando Cidade' : 'Visualizando Cidade';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Cidade';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      idProduct: new FormControl({ value: null, disabled: true }),
      name: new FormControl(null, Validators.required),
      idState: new FormControl(null, Validators.required),
    });
  }

  fillForm(): void {
    if (this.operation !== Operation.NEW) {
      this.subscription = this._cityService.loadOne(Number(this.id)).subscribe((data: any) => {
        this.form.patchValue(data);
      });
      if (this.operation === Operation.VIEW) {
        this.form.disable();
      }
    }
    setTimeout(() => this._loadingService.hide(), 700);
  }

  getStates(): void {
    this.subscription = this._stateService.loadAll().subscribe((response: any) => {
      this.states = response.data;

      if (this.operation === 'NEW') {
        this._loadingService.hide();
      }
    }, (error) => {
      this._loadingService.hide();
      this._swalService.error('Ops', error.error.message);
    });

  }

  onSave(): void {
    if (this._utilsService.formIsValid(this.form)) {

      if (this.operation === Operation.NEW) {
        this._cityService.create(this.form.value).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação.');
        });
      } else {
        this._cityService.update(this.id, this.form.value).subscribe(data => {
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
