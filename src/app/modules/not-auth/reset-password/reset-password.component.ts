import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { SwalService } from 'app/shared/services/swal.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { LoginService } from 'app/shared/services/login.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Auth } from 'app/shared/models/auth.model';
import { AddAuthData, ClearAuthData } from '../../../store/authentication/actions';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    animations: fuseAnimations
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

    form: FormGroup;
    subscription: Subscription;
    authData: Observable<Auth>;
    token: string;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _loginService: LoginService,
        private _swalService: SwalService,
        private _router: Router,
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
        this.getToken();
        this.createForm();
    }

    getToken(): void {
        const urlToken = this._activatedRoute.snapshot.params.token;
        if (urlToken) {
            this.token = urlToken;
        } else {
            this.authData = this._store.pipe(select('auth'));
    
            this.authData.subscribe(data => {
                this.token = data.token;
            });
        }
    }

    createForm(): void {
        this.form = this._formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator, Validators.minLength(8)]]
        });

        this.subscription = this.form.get('password').valueChanges.subscribe(() => {
            this.form.get('passwordConfirm').updateValueAndValidity();
        });
    }

    onReset(): void {
        const payload = { password: this.form.value.password, token: this.token };
        this._loginService.reset(payload).subscribe(
        data => {
            this._swalService.success('Sucesso', data.message);
            this._store.dispatch(ClearAuthData());
            this._router.navigate(['/not-auth/login']);
        }, error => {
            this._swalService.error('Ops', error.error.message);
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
