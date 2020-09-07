import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Auth } from 'app/shared/models/auth.model';
import { ClearAuthData } from 'app/store/authentication/actions';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
    animations: fuseAnimations
})
export class LogoutComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor(
        private _router: Router,
        private _store: Store<{ auth: Auth }>
    ) { }
    
    ngOnInit(): void {
        this._store.dispatch(ClearAuthData());
        this._router.navigate(['/not-auth']);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
