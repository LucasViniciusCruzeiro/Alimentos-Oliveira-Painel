import 'hammerjs';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from 'app/app.component';
import { fuseConfig } from 'app/fuse-config';
import { LayoutModule } from 'app/layout/layout.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { rootReducer } from './store/index.reducers';

import { AppRoutingModule } from './app-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { LoadingModule } from './shared/components/several-components/loading/loading.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        TranslateModule.forRoot(),
        NgxChartsModule,

        // Material moment date module
        MatMomentDateModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // NgRx
        StoreModule.forRoot(rootReducer),
        StoreDevtoolsModule.instrument({maxAge: 25}),

        // App modules
        LayoutModule,
        LoadingModule,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
    ]
})
export class AppModule {
}
