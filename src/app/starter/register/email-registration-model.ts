import {Countries} from '../../enums/countries.enum';

export class EmailRegistrationModel {
    first_name: string;
    last_name: string;
    country_code: Countries = Countries.SG;
    email: string;
    allow_marketing: boolean;
    password: string;
    password_confirmation: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    phone_country: Countries = Countries.SG;
    vehicle_registered_country: Countries = Countries.SG;
    vehicle_registered_state: string;
    vehicle_license_plate: string;
    vehicle_type_id: number;
    vehicle_model_id: number;
    vehicle_model_name: string;
    vehicle_make_id: number;
    vehicle_make_name: string;
    vehicle_color: string;
}
