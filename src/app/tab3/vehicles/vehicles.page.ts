import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../../services/vehicle.service';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.page.html',
    styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

    constructor(public vehicleService: VehicleService) {
        this.vehicleService.retrieveVehicles();
    }

    ngOnInit() {
    }

    refreshVehicles(event) {
        this.vehicleService.retrieveMyVehiclesEvent(event);
    }
}
