import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'app/shared/enums/operation';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { CheckListItemService } from 'app/shared/services/checklist-item.service';
import { SwalService } from 'app/shared/services/swal.service';
import { UtilsService } from 'app/shared/services/utils.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { FactoryService } from 'app/shared/services/factory.service';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { data } from '../../access-profiles/mock/data';

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

  type = [
    { id: 'A', description: 'Avaliação do Condutor' },
    { id: 'C', description: 'Condição do veículo' }
  ];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _swalService: SwalService,
    private _CheckListItemService: CheckListItemService,
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
      this.title = this.operation === Operation.EDIT ? 'Alterando Itens CheckList' : 'Visualizando Itens CheckList';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Itens CheckList';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      idCheckListItem: new FormControl({ value: null, disabled: true }),
      idFactory: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      required: new FormControl(false, Validators.required)
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
      this.subscription = this._CheckListItemService.loadOne(this.id).subscribe((data: any) => {
        data.idFactory = data.factory.idFactory;
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
      const formValue = this.form.value;
      delete formValue.state;
      if (this.operation === Operation.NEW) {
        this._CheckListItemService.create(formValue).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação.');
        });

      } else {
        this._CheckListItemService.update(this.id, formValue).subscribe(data => {
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

