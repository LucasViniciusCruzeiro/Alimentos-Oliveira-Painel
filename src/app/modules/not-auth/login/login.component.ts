import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { LoginService } from 'app/shared/services/login.service';
import { Subscription, Observable } from 'rxjs';
import { SwalService } from 'app/shared/services/swal.service';
import { Router } from '@angular/router';
import { FactoryService } from 'app/shared/services/factory.service';
import { Store } from '@ngrx/store';
import { AddAuthData } from '../../../store/authentication/actions';
import { Auth } from 'app/shared/models/auth.model';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class LoginComponent implements OnInit, OnDestroy {
    form: FormGroup;
    authData: Observable<Auth>;
    subscription: Subscription;
    factories = [];

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _loginService: LoginService,
        private _swalService: SwalService,
        private _router: Router,
        private _factoryService: FactoryService,
        private _store: Store<{ auth: Auth }>
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: { hidden: true },
                toolbar: { hidden: true },
                footer: { hidden: true },
                sidepanel: { hidden: true }
            }
        };
    }

    ngOnInit(): void {
        this.createForm();
        this.getFactories();
    }

    createForm(): void {
        this.form = new FormGroup({
            idFactory: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8)])
        });
      }

    getFactories(): void {
      this._factoryService.loadAllNotAuth().subscribe((result: any) => {
        this.factories = result.data;
      });
    }

    onLogin(): void {
        this.subscription = this._loginService.auth(this.form.value).subscribe(
            res => {
                this._store.dispatch(AddAuthData(res));
                if (res.user.redefinePassword) {
                    this._router.navigate(['not-auth/reset-password']);
                } else {
                    this._router.navigate(['auth/']);
                }
            }, error => {
                if (Array.isArray(error.message)) {
                    this._swalService.error('Ops', 'Email inválido!!');
                } else {
                    this._swalService.error('Ops', error.error.message);
                }
            });

    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
