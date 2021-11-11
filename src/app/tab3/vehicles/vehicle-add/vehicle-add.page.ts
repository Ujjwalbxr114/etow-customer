import {ChangeDetectionStrategy, Component, EventEmitter, OnInit} from '@angular/core';
import {ModalController, NavController, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IdValuePair} from '../../../interfaces/id-value-pair';
import {VehicleService} from '../../../services/vehicle.service';
import {Countries} from '../../../enums/countries.enum';
import {ApiService} from '../../../services/api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LoadingService} from '../../../services/loading.service';
import {ErrorPresentationService} from '../../../services/error-presentation.service';

@Component({
    selector: 'app-vehicle-add',
    templateUrl: './vehicle-add.page.html',
    styleUrls: ['./vehicle-add.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleAddPage implements OnInit {
    vehicleAddForm: FormGroup;
    vehicleModel$: EventEmitter<IdValuePair> = new EventEmitter<IdValuePair>();
    vehicleMake$: EventEmitter<IdValuePair> = new EventEmitter<IdValuePair>();

    constructor(public vehicleService: VehicleService,
                private apiService: ApiService,
                private loadingService: LoadingService,
                private errorPresentationService: ErrorPresentationService,
                private toastController: ToastController,
                private navCtrl: NavController,
                private modalController: ModalController,
                private fb: FormBuilder) {
        this.vehicleAddForm = this.fb.group({
            registered_country: [Countries.SG, Validators.required],
            registered_state: [''],
            license_plate: ['', Validators.required],
            color: ['', Validators.required],
            model_id: ['', Validators.required],
            model_name: ['', Validators.required],
            type_id: ['', Validators.required],
            make_id: ['', Validators.required],
            make_name: [{value: '', disabled: true}, Validators.required],
        });
        this.vehicleService.retrieveVehicleTypesAndModels();
    }

    ngOnInit() {
        this.vehicleModel$.subscribe((result: IdValuePair) => {
            this.vehicleAddForm.get('model_id').setValue(result.id);
            this.vehicleAddForm.get('model_name').setValue(result.value);
        });
        this.vehicleMake$.subscribe((result: IdValuePair) => {
            this.vehicleAddForm.get('make_id').setValue(result.id);
            this.vehicleAddForm.get('make_name').setValue(result.value);
        });
    }

    backButton() {
        this.navCtrl.back();
    }

    submitVehicleAddForm() {
        this.loadingService.showForceLoading();
        this.apiService.authenticatedPost('/vehicles/self', this.vehicleAddForm.getRawValue())
            .subscribe(async response => {
                this.loadingService.hideLoading();
                const toast = await this.toastController.create({
                    message: 'Vehicle added successfully!',
                    duration: 3000,
                    color: 'success'
                });
                toast.present();
                this.vehicleAddForm.reset();
            }, (err: HttpErrorResponse) => {
                this.loadingService.hideLoading();
                if (err.status === 422) {
                    // validation errors
                    this.errorPresentationService.handleValidationErrors(err);
                } else {
                    this.errorPresentationService.handleServerError();
                }
            });
    }

    showVehicleModelsSearch() {
        this.vehicleService.showVehicleModelsSearch(this.vehicleModel$);
    }

    showVehicleMakesSearch() {
        this.retrieveVehicleMakes();
        this.vehicleService.showVehicleMakesSearch(this.vehicleMake$);
    }

    private retrieveVehicleMakes() {
        this.vehicleService.searchVehicleMakes(this.vehicleAddForm.get('type_id').value, this.vehicleAddForm.get('model_id').value);
    }
}
