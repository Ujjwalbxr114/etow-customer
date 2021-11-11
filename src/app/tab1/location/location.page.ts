import {Component, EventEmitter, OnInit} from '@angular/core';
import {Tab1Service} from '../tab1.service';
import {ModalController} from '@ionic/angular';
import {LocationSelectionPage} from '../location-selection/location-selection.page';
import {GpsLocationInterface} from '../../interfaces/gps-location-interface';
import {VehicleSelectionPage} from '../vehicle-selection/vehicle-selection.page';
import {VehicleService} from '../../services/vehicle.service';
import {VehicleInterface} from '../../interfaces/vehicle-interface';
import {VehicleServiceInterface} from '../../interfaces/vehicle-service-interface';
import {ApiService} from '../../services/api.service';
import {ErrorPresentationService} from '../../services/error-presentation.service';
import {first} from 'rxjs/operators';
import {ILatLng} from '@ionic-native/google-maps';
import {TabsService} from '../../tabs/tabs.service';

@Component({
    selector: 'app-tab1-location',
    templateUrl: './location.page.html',
    styleUrls: ['./location.page.scss', '../tab1.page.scss'],
})
export class LocationPage implements OnInit {
    private locationSelected$: EventEmitter<GpsLocationInterface> = new EventEmitter<GpsLocationInterface>();
    private vehicleSelected$: EventEmitter<VehicleInterface> = new EventEmitter<VehicleInterface>();

    constructor(public tab1Service: Tab1Service,
                public tabsService: TabsService,
                private modalController: ModalController,
                private apiService: ApiService,
                private errorPresentationService: ErrorPresentationService,
                private vehicleService: VehicleService) {
    }

    ngOnInit() {
        this.locationSelected$
            .subscribe((locationSelected: GpsLocationInterface) => {
                this.tab1Service.updateLocation(locationSelected);
                const latLng: ILatLng = {
                    lat: locationSelected.lat,
                    lng: locationSelected.lng,
                };
                this.tab1Service.map
                    .animateCamera({
                        target: latLng,
                        zoom: 18,
                        tilt: 30
                    });
            });

        this.vehicleSelected$
            .subscribe((vehicleSelected: VehicleInterface) => {
                this.tab1Service.vehicle = vehicleSelected;
                // Search services limited to this vehicle
                const vehicleServiceCategory = this.tab1Service.selectedServiceCategory$.getValue();
                this.apiService.authenticatedGet('/vehicle-service-categories/' + vehicleServiceCategory.id + '/search', {
                    vehicle_id: vehicleSelected.id.toString()
                })
                    .pipe(first())
                    .subscribe(response => {
                        if (response.data) {
                            this.tab1Service.searchServices$.next(response);
                        }
                    }, err => {
                        this.errorPresentationService.handleServerError();
                    });
            });
    }

    ionViewDidLeave() {
        this.locationSelected$.complete();
        this.vehicleSelected$.complete();
    }

    backButton() {
        // show tabs again
        this.tabsService.setTabsEnabled();
        this.tab1Service.decrementStep();
    }

    async showLocationSelectionModal() {
        const modal = await this.modalController.create({
            component: LocationSelectionPage,
            componentProps: {
                locationSelected$: this.locationSelected$,
            }
        });
        modal.present();
    }

    async showVehiclesModal() {
        this.vehicleService.retrieveVehicles();
        const modal = await this.modalController.create({
            component: VehicleSelectionPage,
            componentProps: {
                vehicleSelected$: this.vehicleSelected$
            }
        });
        modal.present();
    }

    selectVehicleService(vehicleService: VehicleServiceInterface) {
        this.tab1Service.selectedService$.next(vehicleService);
        this.tab1Service.incrementStep();
    }
}
