import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {VehicleService} from '../../services/vehicle.service';
import {VehicleInterface} from '../../interfaces/vehicle-interface';

@Component({
    selector: 'app-vehicle-selection',
    templateUrl: './vehicle-selection.page.html',
    styleUrls: ['./vehicle-selection.page.scss'],
})
export class VehicleSelectionPage implements OnInit {
    @Input()
    vehicleSelected$: EventEmitter<VehicleInterface> = new EventEmitter<VehicleInterface>();

    constructor(private modalController: ModalController,
                public vehicleService: VehicleService,
                private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    dismissModal() {
        this.modalController.dismiss();
    }

    selectVehicle(vehicle: VehicleInterface) {
        this.vehicleSelected$.emit(vehicle);
        this.dismissModal();
    }

    addVehicleRedirect() {
        this.dismissModal();
        this.navCtrl.navigateForward('/tabs/tab3/vehicles/vehicle-add');
    }
}
