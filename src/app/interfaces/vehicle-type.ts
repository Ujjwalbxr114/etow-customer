import {VehicleServiceInterface} from './vehicle-service-interface';

export interface VehicleType {
    id: number;
    name: string;
    description: string;
    vh_services: VehicleServiceInterface[];
}
