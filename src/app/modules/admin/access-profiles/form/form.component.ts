import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'app/shared/enums/operation';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { Subscription } from 'rxjs';

import { factoryItems } from './../mock/data';
import { SwalService } from 'app/shared/services/swal.service';
import { UtilsService } from 'app/shared/services/utils.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, FormInterface, OnDestroy {
  title = 'Incluindo Perfil de Acesso';
  id: string | number;
  item: any;
  operation: Operation = Operation.NEW;
  form: FormGroup;
  subscription: Subscription;

  factoryList = factoryItems;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _utilsService: UtilsService
  ) { }

  ngOnInit(): void { 
    this.setOperation();
    this.createForm();
    this.fillForm();
  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando Perfil de Acesso' : 'Visualizando Perfil de Acesso';
    } else {
      this.operation = Operation.NEW;
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: 1, disabled: true }),
      idFactory: new FormControl(null, Validators.required),
      profileName: new FormControl(null, Validators.required),
      screens: new FormControl(null, Validators.required),
      features: new FormControl(null, Validators.required)
    });
  }

  fillForm(): void {
    if (this.operation === Operation.VIEW) {
      this.form.disable();
    } else if (this.operation !== Operation.NEW) {
      this.form.patchValue({
        idFactory: 2,
        profileName: 'Profile Name Example',
        screens: [1],
        features: [2, 3]
      });
    }
  }

  onSave(): void {
    if (this._utilsService.formIsValid(this.form)) {
      this._swalService.success('Operação realizada com sucesso.');
    }

    this._router.navigate(['../'], {
      relativeTo: this._activatedRoute
    });
  }

  onUpdate(): void {
    if (this._utilsService.formIsValid(this.form)) {
      this._swalService.success('Operação realizada com sucesso.');
    }

    this._router.navigate(['../..'], {
      relativeTo: this._activatedRoute
    });
  }

  onCancel(): void {
    let dest = '../../';

    if (this.operation === Operation.NEW) {
      dest = '../';
    }

    this._router.navigate([dest], {
      relativeTo: this._activatedRoute
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
