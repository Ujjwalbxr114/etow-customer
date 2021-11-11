import {EventEmitter, Injectable} from '@angular/core';
import {first, takeWhile} from 'rxjs/operators';
import {ApiService} from './api.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ResourceCollection} from '../interfaces/resource-collection';
import {VehicleInterface} from '../interfaces/vehicle-interface';
import {LoadingService} from './loading.service';
import {ErrorPresentationService} from './error-presentation.service';
import {IdValuePairArray} from '../interfaces/id-value-pair-array';
import {VehicleType} from '../interfaces/vehicle-type';
import {VehicleModel} from '../interfaces/vehicle-model';
import {VehicleInfoSelectionPage} from '../components/vehicle-info-selection/vehicle-info-selection.page';
import {ModalController} from '@ionic/angular';
import {IdValuePair} from '../interfaces/id-value-pair';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    public myVehicles$: BehaviorSubject<ResourceCollection<VehicleInterface>> = new BehaviorSubject<ResourceCollection<VehicleInterface>>({data: []});
    public vehicleTypes$: BehaviorSubject<IdValuePairArray> = new BehaviorSubject([]);
    public vehicleModels$: BehaviorSubject<IdValuePairArray> = new BehaviorSubject([]);
    public vehicleMakes$: BehaviorSubject<IdValuePairArray> = new BehaviorSubject([]);
    public makeLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private previousSub: Subscription;

    constructor(private apiService: ApiService,
                private modalController: ModalController,
                private loadingService: LoadingService,
                private errorPresentationService: ErrorPresentationService) {
    }

    retrieveVehicles() {
        this.loadingService.showForceLoading();
        this.apiService.authenticatedGet('/vehicles/self', {})
            .pipe(first())
            .subscribe(
                response => {
                    this.loadingService.hideLoading();
                    if (response.data) {
                        this.myVehicles$.next(response);
                    }
                },
                err => {
                    this.loadingService.hideLoading();
                    this.errorPresentationService.handleServerError();
                });
    }

    retrieveMyVehiclesEvent(event) {
        this.apiService.authenticatedGet('/vehicles/self', {})
            .pipe(first())
            .subscribe(
                response => {
                    event.target.complete();
                    if (response.data) {
                        this.myVehicles$.next(response);
                    }
                },
                err => {
                    this.errorPresentationService.handleServerError();
                });
    }

    retrieveVehicleTypesAndModels() {
        this.apiService.get('/vehicle-info/all', {})
            .subscribe(response => {
                if (response.data) {
                    const responseData = response.data;

                    if (responseData.vehicle_types) {
                        const currentTypeVal: IdValuePairArray = [];
                        responseData.vehicle_types.forEach((vehicleType: VehicleType) => {
                            currentTypeVal.push({id: vehicleType.id, value: vehicleType.name});
                        });
                        this.vehicleTypes$.next(currentTypeVal);
                    }

                    if (responseData.vehicle_models) {
                        const currentModelVal: IdValuePairArray = [];
                        responseData.vehicle_models.forEach((vehicleModel: VehicleModel) => {
                            currentModelVal.push({id: vehicleModel.id, value: vehicleModel.name});
                        });
                        this.vehicleModels$.next(currentModelVal);
                    }
                }
            }, err => {
                this.errorPresentationService.handleServerError();
            });
    }

    searchVehicleMakes(vehicleTypeId: number, vehicleModelId: number) {
        this.makeLoaded$.next(false);
        this.loadingService.showForceLoading();
        const data = {
            vehicle_type_id: String(vehicleTypeId),
            vehicle_model_id: String(vehicleModelId),
        };
        this.apiService.get('/vehicle-info/search-make', data)
            .subscribe(response => {
                if (response.data) {
                    this.loadingService.hideLoading();
                    const responseData = response.data;

                    const makes: IdValuePairArray = [];

                    responseData.forEach(make => {
                        makes.push({id: make.id, value: make.name});
                    });
                    this.vehicleMakes$.next(makes);
                    this.makeLoaded$.next(true);
                }
            }, err => {
                this.errorPresentationService.handleServerError();
                this.loadingService.hideLoading();
            });
    }

    async showVehicleModelsSearch(selectedItem$: EventEmitter<IdValuePair>) {
        const modal = await this.modalController.create({
            component: VehicleInfoSelectionPage,
            componentProps: {
                name: 'model',
                searchList: this.vehicleModels$.getValue(),
                selectedItem: selectedItem$,
            },
        });
        modal.present();
    }

    showVehicleMakesSearch(selectedItem$: EventEmitter<IdValuePair>) {
        if (this.previousSub) {
            this.previousSub.unsubscribe();
        }

        this.previousSub = this
            .makeLoaded$
            .pipe(takeWhile(result => !result, true))
            .subscribe(async result => {
                if (result) {
                    const modal = await this.modalController.create({
                        component: VehicleInfoSelectionPage,
                        componentProps: {
                            name: 'make',
                            searchList: this.vehicleMakes$.getValue(),
                            selectedItem: selectedItem$,
                        }
                    });
                    modal.present();
                }
            });
    }
}
