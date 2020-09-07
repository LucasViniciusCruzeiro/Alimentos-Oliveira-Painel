import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { LoginService } from 'app/shared/services/login.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    form: FormGroup;

    subscription: Subscription;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService
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
        this.form = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }


    verifyEmail() {
        this.subscription = this._loginService.forgot(this.form.value.email).subscribe(data => {
            console.log('data', data);
        },
        error => {
            console.log('error', error);
        })
        //requisição para verificar email
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
