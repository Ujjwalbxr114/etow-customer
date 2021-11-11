import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {Device} from '@ionic-native/device/ngx';
import {IonicStorageModule} from '@ionic/storage';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import {HttpXsrfInterceptor} from './interceptors/http-xsrf-interceptor';

import { GoogleMaps } from '@ionic-native/google-maps/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientXsrfModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot()
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        GoogleMaps,
        LocationAccuracy,
        Device,
        BackgroundMode,
        {provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
