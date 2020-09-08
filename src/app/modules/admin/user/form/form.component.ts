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
import { data } from '../../access-profiles/mock/data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, FormInterface, OnDestroy {
  title = 'Usuários';
  id: number;
  item: any;
  operation: Operation = Operation.NEW;
  form: FormGroup;
  subscription: Subscription;
  typeDocument: any;
  mask: string;

  factories = [];
  items = [];
  shippingCompanies = [];

  profiles: FormArray;
  profilesSelected = [];
  dataFactory = [
    {
      id: 1,
      name: 'Fábrica 1',
      profiles: [ 
        { id: 1, name: 'Perfil 1' }, { id: 2, name: 'Perfil 2' }, { id: 3, name: 'Perfil 3' }
      ],
    }, {
      id: 2,
      name: 'Fábrica 2',
      profiles: [ 
        { id: 4, name: 'Perfil 2' }, { id: 5, name: 'Perfil 3' }, { id: 6, name: 'Perfil 4' }
      ],
    }, {
      id: 3,
      name: 'Fábrica 3',
      profiles: [ 
        { id: 7, name: 'Perfil 1' }, { id: 8, name: 'Perfil 4' }, { id: 9, name: 'Perfil 5' }
      ],
    }
  ];

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
      connectedShippingCompany: new FormControl(null),
      sector: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      selectedProfile:  new FormControl(null),
      profiles: new FormBuilder().array([], Validators.required),
      shippingCompany: new FormControl(null),
      redefinePassword: new FormControl(null),
    });
  }

  getShippingCompanies(): void {
    this._shippingCompanyService.loadAll().subscribe((result: any) => {
      this.shippingCompanies = result.data;
      this._loadingService.hide();
    });
  }

  onSelectShippingCompany(event): void {
    const idShippingCompany = event.value;
    this.getDataFactories(idShippingCompany);
  }

  getDataFactories(idShippingCompany): void {
    console.log(idShippingCompany)
  }

  createItem(selectedIds, factoryId): void {
    this.profiles.push(new FormControl({[factoryId]: selectedIds ? selectedIds : null}));
  }

  addItem(selectedIds, factory): void {
    selectedIds = selectedIds.value;
    const factoryId = factory.id;

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
      this.createItem(selectedIds, factoryId);
      this.items.push(factoryId);
    }

  }

  fillForm(): void {
    if (this.operation !== Operation.NEW) {
      this.subscription = this._userService.loadOne(Number(this.id)).subscribe((data: any) => {
        data.shippingCompany = data.shippingCompany.idShippingCompany
        if (data.shippingCompany) {
          data.connectedShippingCompany = true;
        }
        this.form.patchValue(data);
        this._loadingService.hide();
      });
    }

    if (this.operation === Operation.VIEW) {
      this.form.disable();
    }
  }


  changeConnectedShipping() {
    this.form.controls['connectedShippingCompany'].setValue(!this.form.controls['connectedShippingCompany'].value)
    console.log(this.form.controls['connectedShippingCompany'].value)
  }

  onSave(): void {
    if (this._utilsService.formIsValid(this.form)) {
      this.profilesSelected = [];
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
