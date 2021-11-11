import {Component, EventEmitter, OnInit} from '@angular/core';
import {EmailRegistrationService} from '../email-registration.service';
import {Router} from '@angular/router';
import {VehicleInfoSelectionPage} from '../../../components/vehicle-info-selection/vehicle-info-selection.page';
import {ModalController} from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorPresentationService} from '../../../services/error-presentation.service';
import {takeWhile} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {VehicleService} from '../../../services/vehicle.service';
import {IdValuePair} from '../../../interfaces/id-value-pair';

@Component({
    selector: 'app-email-three',
    templateUrl: './email-three.page.html',
    styleUrls: ['./email-three.page.scss', '../../email-shared.scss'],
})
export class EmailThreePage implements OnInit {
    private previousSub: Subscription;
    private vehicleModel$: EventEmitter<IdValuePair> = new EventEmitter<IdValuePair>();
    private vehicleMake$: EventEmitter<IdValuePair> = new EventEmitter<IdValuePair>();

    constructor(public emailRegistrationService: EmailRegistrationService,
                public vehicleService: VehicleService,
                private router: Router,
                private modalController: ModalController,
                private errorPresentationService: ErrorPresentationService) {
    }

    ngOnInit() {
        this.vehicleModel$.subscribe((result: IdValuePair) => {
            this.emailRegistrationService.emailRegistrationModel.vehicle_model_id = result.id;
            this.emailRegistrationService.emailRegistrationModel.vehicle_model_name = result.value;
        });
        this.vehicleMake$.subscribe((result: IdValuePair) => {
            this.emailRegistrationService.emailRegistrationModel.vehicle_make_id = result.id;
            this.emailRegistrationService.emailRegistrationModel.vehicle_make_name = result.value;
        });
    }

    ionViewWillLeave() {
        if (this.previousSub) {
            this.previousSub.unsubscribe();
        }
    }

    showVehicleModelsSearch() {
        this.vehicleService.showVehicleModelsSearch(this.vehicleModel$);
    }

    showVehicleMakesSearch() {
        this.retrieveVehicleMakes();
        this.vehicleService.showVehicleMakesSearch(this.vehicleMake$);
    }

    register() {
        this.emailRegistrationService
            .register()
            .subscribe(response => {
                console.log(response);
                this.router.navigateByUrl('/starter/register/phone-verify', {replaceUrl: true});
            }, (err: HttpErrorResponse) => {
                if (err.status === 422) {
                    // validation errors
                    this.errorPresentationService.handleValidationErrors(err);
                } else {
                    this.errorPresentationService.handleServerError();
                }
            });
    }

    retrieveVehicleMakes() {
        this.vehicleService.searchVehicleMakes(this.emailRegistrationService.emailRegistrationModel.vehicle_type_id,
            this.emailRegistrationService.emailRegistrationModel.vehicle_model_id);
    }
}
