import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormInterface } from 'app/shared/interfaces/form.interface';
import { Operation } from 'app/shared/enums/operation';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SwalService } from 'app/shared/services/swal.service';
import { FactoryService } from 'app/shared/services/factory.service';
import { LoadingService } from 'app/shared/components/several-components/loading/loading.service';
import { UserService } from 'app/shared/services/user.service';
import { UtilsService } from 'app/shared/services/utils.service';
import { ShippingCompanyService } from 'app/shared/services/shipping-company.service';

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

  factories = [];
  shippingCompanies = [];

  items = [];
  profiles: FormArray;
  profilesSelected = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _utilsService: UtilsService,
    private _userService: UserService,
    private _factoryService: FactoryService,
    private _shippingCompanyService: ShippingCompanyService,
    private _loadingService: LoadingService
  ) {
    this._loadingService.show();
  }

  ngOnInit(): void {
    this.setOperation();
    this.createForm();
    this.getShippingCompanies();
    this.getFactories();
    this.fillForm();
  }

  setOperation(): void {
    this.id = this._activatedRoute.snapshot.params.id as number;
    if (this.id) {
      this.operation = this._activatedRoute.snapshot.url[1].path.indexOf('edit') > -1 ? Operation.EDIT : Operation.VIEW;
      this.title = this.operation === Operation.EDIT ? 'Alterando Usuário' : 'Visualizando Usuário';
    } else {
      this.operation = Operation.NEW;
      this.title = 'Incluindo Usuário';
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      idUser: new FormControl(null),
      idShippingCompany:  new FormControl(null),
      connectedShippingCompany: new FormControl(false),
      sector: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      selectedProfile:  new FormControl(null),
      profiles: new FormBuilder().array([], Validators.required),
      redefinePassword: new FormControl(null),
    });
  }

  getShippingCompanies(): void {
    this._shippingCompanyService.loadAll().subscribe((result: any) => {
      this.shippingCompanies = result.data;
      this._loadingService.hide();
    });
  }

  getFactories(): void {
    const active = { active: 1 };
    this._factoryService.loadAll(active).subscribe((result: any) => {
      this.factories = result.data;
      this._loadingService.hide();
    });
  }

  onSelectShippingCompany(event): void {
    const idShippingCompany = event.value;
    this.getFactoryByShippingCompany(idShippingCompany);
  }

  getFactoryByShippingCompany(idShippingCompany): void {
    this._shippingCompanyService.loadOne(Number(idShippingCompany)).subscribe((result: any) => {
      this.factories = [result.factory];
      this._loadingService.hide();
    });
  }

  changeConnectedShipping(event): void {
    const checked = event.checked;
    this.form.controls['connectedShippingCompany'].setValue(checked);
    this.form.controls['idShippingCompany'].setValue(null);
    this.form.controls['selectedProfile'].setValue(null);
    this.getFactories();
  }

  createItem(selectedIds): void {
    this.profiles.push(new FormControl(selectedIds));
  }

  addItem(event, item): void {
    const selectedIds = event.value;
    const factoryId = item.idFactory;

    this.profiles = this.form.get('profiles') as FormArray;
    let indice;

    this.items.filter((element, index) => {
      if (element === factoryId) {
        indice = index;
      }
      return element;
    });
    
    if (this.items.filter(element => element === factoryId).length) {
      this.profiles.controls[indice].setValue(selectedIds);
    } else {
      this.createItem(selectedIds);
      this.items.push(factoryId);
    }

  }

  fillForm(): void {
    if (this.operation !== Operation.NEW) {
      this.subscription = this._userService.loadOne(Number(this.id)).subscribe((data: any) => {
        if (data.shippingCompany) {
          data.idShippingCompany = data.shippingCompany.idShippingCompany;
          data.connectedShippingCompany = true;
        }
        this.form.controls['profiles'].validator = null;
        this.form.patchValue(data);
        this._loadingService.hide();
      });
    }

    if (this.operation === Operation.VIEW) {
      this.form.controls['connectedShippingCompany'].disable();
      this.form.disable();
    }
  }

  onSave(): void {
    if (this._utilsService.formIsValid(this.form)) {
      this.form.value.profiles = this.form.value.profiles.map(itemFactory => {
        return Object.values(itemFactory).map(itemProfile => {
          return this.profilesSelected.push(itemProfile);
        });
      });
      this.form.value.profiles = this.profilesSelected;
      if (this.operation === Operation.NEW) {
        this._userService.create(this.form.value).subscribe(data => {
          this._swalService.success('Operação realizada com sucesso.').then(res => this.navigate());
        }, (error) => {
          this._swalService.error('Ops', 'Falha ao realizar a operação.');
        });
      } else {
        this._userService.update(this.id, this.form.value).subscribe(data => {
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
