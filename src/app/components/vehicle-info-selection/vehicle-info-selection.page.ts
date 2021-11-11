import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {IdValuePairArray} from '../../interfaces/id-value-pair-array';
import {IdValuePair} from '../../interfaces/id-value-pair';

@Component({
    selector: 'app-email-vehicle-selection',
    templateUrl: './vehicle-info-selection.page.html',
    styleUrls: ['./vehicle-info-selection.page.scss', '../../starter/email-shared.scss'],
})
export class VehicleInfoSelectionPage implements OnInit {
    @Input()
    name: string;
    // TODO: use behaviour subject for search list
    @Input()
    searchList: IdValuePairArray;
    @Output()
    selectedItem: EventEmitter<IdValuePair> = new EventEmitter<IdValuePair>();

    searchText = '';

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
    }

    dismissModal() {
        this.modalController.dismiss();
    }

    selectItem(id: number, name: string) {
        this.selectedItem.emit({id, value: name});
        this.modalController.dismiss();
    }
}
