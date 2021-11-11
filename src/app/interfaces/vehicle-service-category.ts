import {VehicleServiceInterface} from './vehicle-service-interface';

export interface VehicleServiceCategory {
    id: number;
    name: string;
    description: string;
    order: number;
    is_valid: boolean;
    vh_services: VehicleServiceInterface[];
}
