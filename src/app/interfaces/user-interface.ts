import {Countries} from '../enums/countries.enum';

export interface UserInterface {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    phone_country: Countries;
    email_verified: boolean;
    phone_verified: boolean;
    allow_marketing: boolean;
    two_factor: boolean;
    country_code: Countries;
    date_of_birth: string;
    gender?: string;
}
