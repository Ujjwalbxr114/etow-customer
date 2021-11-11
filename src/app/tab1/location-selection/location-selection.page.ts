import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Tab1Service} from '../tab1.service';
import {ModalController, ToastController} from '@ionic/angular';
import {MyLocation} from '@ionic-native/google-maps';
import {BehaviorSubject} from 'rxjs';
import {LocationErrorNoPermission} from '../../errors/location-error-no-permission';
import {GeocoderResult} from '@ionic-native/google-maps/ngx';
import {first} from 'rxjs/operators';
import {GpsLocationInterface} from '../../interfaces/gps-location-interface';
import {GpsLocation} from '../../models/gps-location';

@Component({
    selector: 'app-location-selection',
    templateUrl: './location-selection.page.html',
    styleUrls: ['./location-selection.page.scss'],
})
export class LocationSelectionPage implements OnInit {
    @Input()
    locationSelected$: EventEmitter<GpsLocationInterface> = new EventEmitter<GpsLocationInterface>();
    public searchLocationName = '';
    public searchResults$: BehaviorSubject<GeocoderResult[]> = new BehaviorSubject<GeocoderResult[]>([]);

    constructor(public tab1Service: Tab1Service,
                private modalController: ModalController,
                private toastController: ToastController) {
    }

    ngOnInit() {
    }

    dismissModal() {
        this.modalController.dismiss();
    }

    startSearchIndicator() {
        this.tab1Service.startSearchIndicator();
    }

    search() {
        this.tab1Service
            .getGeocode(this.searchLocationName)
            .pipe(first())
            .subscribe((result: GeocoderResult[]) => {
                this.searchResults$.next(result);
            });
    }

    getLocation() {
        this.tab1Service
            .getCurrentLocation()
            .pipe(first())
            .subscribe((data: MyLocation) => {
                this.tab1Service.setGPSLoadingComplete();
                this.tab1Service
                    .getReverseGeocode(data.latLng.lat, data.latLng.lng)
                    .pipe(first())
                    .subscribe(result => this.selectSearchResult(result[0]));
            }, async err => {
                this.tab1Service.setGPSLoadingComplete();
                if (err instanceof LocationErrorNoPermission) {
                    const toast = await this.toastController.create({
                        message: 'Location permission is disabled!',
                        duration: 3000,
                        color: 'danger'
                    });
                    toast.present();
                } else {
                    const toast = await this.toastController.create({
                        message: 'GPS not available!',
                        duration: 3000,
                        color: 'danger'
                    });
                    toast.present();
                }
            });
    }

    selectSearchResult(result: GeocoderResult) {
        let searchLocationName = '';
        if (result.extra && result.extra.featureName && result.extra.featureName !== '') {
            searchLocationName += result.extra.featureName + ' ';
        }
        if (result.locality && result.locality !== '') {
            searchLocationName += result.locality + ' ';
        }
        if (result.subLocality && result.subLocality !== '') {
            searchLocationName += result.subLocality + ' ';
        }
        if (result.adminArea && result.adminArea !== '') {
            searchLocationName += result.adminArea + ' ';
        }
        if (result.subAdminArea && result.subAdminArea !== '') {
            searchLocationName += result.subAdminArea + ' ';
        }
        if (result.thoroughfare && result.thoroughfare !== '') {
            searchLocationName += result.thoroughfare + ' ';
        }
        if (result.subThoroughfare && result.subThoroughfare !== '') {
            searchLocationName += result.subThoroughfare + ' ';
        }
        if (result.country && result.country !== '') {
            searchLocationName += result.country + ' ';
        }
        if (result.postalCode && result.postalCode !== '') {
            searchLocationName += result.postalCode;
        }
        const searchLocation = new GpsLocation();
        searchLocation.address = searchLocationName;
        searchLocation.lat = result.position.lat;
        searchLocation.lng = result.position.lng;
        this.locationSelected$.emit(searchLocation);
        this.dismissModal();
    }
}
