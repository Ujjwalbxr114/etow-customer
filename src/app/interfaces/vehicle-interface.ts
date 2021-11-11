import {VehicleMake} from './vehicle-make';

export interface VehicleInterface {
    id: number;
    license_plate: string;
    registered_country: string;
    registered_state: string;
    color: string;
    vehicle_make: VehicleMake;
}
