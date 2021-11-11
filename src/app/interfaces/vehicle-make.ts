import {VehicleType} from './vehicle-type';
import {VehicleModel} from './vehicle-model';

export interface VehicleMake {
    id: number;
    name: string;
    vehicle_type: VehicleType;
    vehicle_model: VehicleModel;
}
