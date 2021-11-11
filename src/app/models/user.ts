import {UserInterface} from '../interfaces/user-interface';
import {Countries} from '../enums/countries.enum';

export class User implements UserInterface {
    allow_marketing = true;
    country_code = Countries.SG;
    date_of_birth = '';
    email = '';
    email_verified = false;
    first_name = '';
    gender = null;
    id = null;
    last_name = '';
    phone_country = Countries.SG;
    phone_number = '';
    phone_verified = false;
    two_factor = false;
}
