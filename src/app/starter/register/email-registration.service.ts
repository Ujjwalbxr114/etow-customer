import {Injectable} from '@angular/core';
import {EmailRegistrationModel} from './email-registration-model';
import {ApiService} from '../../services/api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {VehicleService} from '../../services/vehicle.service';

@Injectable({
    providedIn: 'root'
})
export class EmailRegistrationService {
    public emailRegistrationModel: EmailRegistrationModel;
    public phoneVerified$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(public vehicleService: VehicleService,
                private apiService: ApiService) {
        this.emailRegistrationModel = new EmailRegistrationModel();
        this.vehicleService.retrieveVehicleTypesAndModels();
    }

    public register(): Observable<any> {
        const data = {
            first_name: this.emailRegistrationModel.first_name,
            last_name: this.emailRegistrationModel.last_name,
            country_code: this.emailRegistrationModel.country_code,
            email: this.emailRegistrationModel.email,
            allow_marketing: this.emailRegistrationModel.allow_marketing ? '1' : '0',
            password: this.emailRegistrationModel.password,
            phone_number: this.emailRegistrationModel.phone_number,
            phone_country: this.emailRegistrationModel.phone_country,
            date_of_birth: this.emailRegistrationModel.date_of_birth,
            gender: this.emailRegistrationModel.gender,
            vehicle_registered_country: this.emailRegistrationModel.vehicle_registered_country,
            vehicle_license_plate: this.emailRegistrationModel.vehicle_license_plate,
            vehicle_make_id: String(this.emailRegistrationModel.vehicle_make_id),
            vehicle_color: this.emailRegistrationModel.vehicle_color,
            device_name: this.apiService.getDeviceName(),
        };
        return this.apiService.post('/auth/register/customer', data);
    }
}
