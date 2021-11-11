import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, of, throwError} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {
    BaseArrayClass, DirectionsRenderer, DirectionsRendererOptions, DirectionsRequest, DirectionsService,
    Geocoder,
    GeocoderRequest,
    GeocoderResult,
    GoogleMap, ILatLng,
    LocationService,
    Marker, MarkerOptions,
    MyLocation
} from '@ionic-native/google-maps/ngx';
import {flatMap, tap, map, first} from 'rxjs/operators';
import {LocationErrorNoPermission} from '../errors/location-error-no-permission';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {LocationErrorNoMap} from '../errors/location-error-no-map';
import {GpsLocationInterface} from '../interfaces/gps-location-interface';
import {GpsLocation} from '../models/gps-location';
import {WorkshopLocation} from '../models/workshop-location';
import {VehicleInterface} from '../interfaces/vehicle-interface';
import {VehicleServiceCategory} from '../interfaces/vehicle-service-category';
import {ResourceCollection} from '../interfaces/resource-collection';
import {VehicleServiceInterface} from '../interfaces/vehicle-service-interface';

@Injectable({
    providedIn: 'root'
})
export class Tab1Service {
    public MAP_ELEMENT = 'map-canvas';
    public map: GoogleMap;
    public directionsRenderer: DirectionsRenderer;
    public serviceCategories$: BehaviorSubject<ResourceCollection<VehicleServiceCategory>>
        = new BehaviorSubject<ResourceCollection<VehicleServiceCategory>>({data: []});
    public selectedServiceCategory$: BehaviorSubject<VehicleServiceCategory> = new BehaviorSubject<VehicleServiceCategory>(null);
    public searchServices$: BehaviorSubject<ResourceCollection<VehicleServiceInterface>>
        = new BehaviorSubject<ResourceCollection<VehicleServiceInterface>>({data: []});
    public selectedService$: BehaviorSubject<VehicleServiceInterface> = new BehaviorSubject<VehicleServiceInterface>(null);
    public locationLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public locationSearching$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public step$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    public searchLocation: GpsLocationInterface = new GpsLocation();
    public locationMarker$: BehaviorSubject<Marker> = new BehaviorSubject<Marker>(null);
    public workshopLocation: WorkshopLocation = new WorkshopLocation();
    public workshopMarker$: BehaviorSubject<Marker> = new BehaviorSubject<Marker>(null);
    public vehicle: VehicleInterface;

    constructor(private modalController: ModalController,
                private locationAccuracy: LocationAccuracy) {
    }

    incrementStep() {
        const val = this.step$.getValue();
        const newVal = val + 1;

        this.step$.next(newVal);
    }

    decrementStep() {
        const val = this.step$.getValue();
        const newVal = val - 1;

        this.step$.next(newVal);
    }

    getCurrentLocation(): Observable<MyLocation> {
        if (this.map && !this.locationLoading$.getValue()) {
            this.locationLoading$.next(true);

            return from(LocationService.hasPermission())
                .pipe(flatMap((hasPermission: boolean) => {
                        if (hasPermission) {
                            return from(this.locationAccuracy.canRequest());
                        } else {
                            return throwError(new LocationErrorNoPermission());
                        }
                    }),
                    flatMap((canRequest: boolean) => {
                        if (canRequest) {
                            return from(this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY));
                        } else {
                            return throwError(new LocationErrorNoPermission());
                        }
                    }),
                    flatMap(() => from(this.map.getMyLocation())),
                );
        } else {
            return throwError(new LocationErrorNoMap());
        }
    }

    public updateLocation(newLocation: GpsLocationInterface) {
        this.searchLocation = newLocation;
        const currentLocationMarker = this.locationMarker$.getValue();

        // Remove existing marker
        if (currentLocationMarker) {
            currentLocationMarker.remove();
        }
        const position: ILatLng = {lat: newLocation.lat, lng: newLocation.lng};
        const options: MarkerOptions = {
            position,
            draggable: false,
            title: 'Your Location',
        };
        this.addMarker(options).subscribe(result => {
            this.locationMarker$.next(result);

            const currentWorkshop = this.workshopMarker$.getValue();
            if (currentWorkshop) {
                this.renderDirection(result, currentWorkshop);
            }
        });
    }

    public updateWorkshop(newWorkshop: WorkshopLocation) {
        this.workshopLocation = newWorkshop;

        const currentWorkshop = this.workshopMarker$.getValue();

        // Remove existing marker
        if (currentWorkshop) {
            currentWorkshop.remove();
        }
        const position: ILatLng = {lat: newWorkshop.lat, lng: newWorkshop.lng};
        const options: MarkerOptions = {
            position,
            draggable: false,
            title: newWorkshop.name,
        };
        this.addMarker(options).subscribe(result => {
            this.workshopMarker$.next(result);

            const currentLocation = this.locationMarker$.getValue();
            if (currentLocation) {
                this.renderDirection(currentLocation, result);
            }
        });
    }

    private addMarker(options: MarkerOptions): Observable<Marker> {
        return from(this.map.addMarker(options)).pipe(first());
    }

    private async renderDirection(start: Marker, end: Marker) {
        console.log('start route search');

        const request: DirectionsRequest = {
            origin: start.getPosition(),
            destination: end.getPosition(),
            travelMode: 'DRIVING',
        };

        console.log('route finding');

        from(DirectionsService.route(request)).pipe(first(), flatMap(async result => {
            console.log('route found');
            console.log(result);
            if (!this.directionsRenderer) {
                console.log('create directions renderer');
                const directionsOptions: DirectionsRendererOptions = {
                    directions: result,
                };
                this.directionsRenderer = this.map.addDirectionsRendererSync(directionsOptions);
                console.log('route renderer added');
                console.log(this.directionsRenderer);
                return of(this.directionsRenderer);
            }
            console.log('use existing renderer');
            return from(this.directionsRenderer.setDirections(result));
        })).subscribe(async () => {
            console.log('success render');
        }, async err => {
            console.log('error');
            console.error(err);
        });
    }

    setGPSLoadingComplete(): void {
        this.locationLoading$.next(false);
    }

    startSearchIndicator() {
        this.locationSearching$.next(true);
    }

    getGeocode(address: string): Observable<GeocoderResult[]> {
        const options: GeocoderRequest = {
            address
        };
        return this.geocodeSearch(options);
    }

    getReverseGeocode(lat: number, lng: number): Observable<GeocoderResult[]> {
        const options: GeocoderRequest = {
            position: {lat, lng}
        };
        return this.geocodeSearch(options);
    }

    private geocodeSearch(options: GeocoderRequest): Observable<GeocoderResult[]> {
        this.startSearchIndicator();

        return from(Geocoder.geocode(options))
            .pipe(
                tap(() => this.locationSearching$.next(false)),
                map<GeocoderResult[] | BaseArrayClass<GeocoderResult[]>, GeocoderResult[]>(data => {
                    if (data instanceof BaseArrayClass) {
                        return data.getArray()[0];
                    }

                    return data;
                })
            );
    }
}
