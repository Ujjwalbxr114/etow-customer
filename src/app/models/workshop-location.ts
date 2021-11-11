import {GpsLocationInterface} from '../interfaces/gps-location-interface';

export class WorkshopLocation implements GpsLocationInterface {
    id: number;
    name = '';
    address = '';
    lat = null;
    lng = null;
    distance: number = null;
}
