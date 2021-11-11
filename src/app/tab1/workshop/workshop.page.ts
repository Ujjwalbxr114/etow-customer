import {Component, EventEmitter, OnInit} from '@angular/core';
import {Tab1Service} from '../tab1.service';
import {ModalController} from '@ionic/angular';
import {WorkshopLocation} from '../../models/workshop-location';
import {WorkshopSelectionPage} from '../workshop-selection/workshop-selection.page';

@Component({
    selector: 'app-tab1-workshop',
    templateUrl: './workshop.page.html',
    styleUrls: ['./workshop.page.scss', '../tab1.page.scss'],
})
export class WorkshopPage implements OnInit {
    private workshopSelected$: EventEmitter<WorkshopLocation> = new EventEmitter<WorkshopLocation>();

    constructor(public tab1Service: Tab1Service,
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.workshopSelected$.subscribe((workshopSelected: WorkshopLocation) => {
            this.tab1Service.updateWorkshop(workshopSelected);
        });
    }

    backButton() {
        this.tab1Service.decrementStep();
    }

    getHelp() {
        this.tab1Service.incrementStep();
    }

    async showWorkshopSelectionModal() {
        const modal = await this.modalController.create({
            component: WorkshopSelectionPage,
            componentProps: {
                workshopSelected$: this.workshopSelected$,
            }
        });
        await modal.present();
    }
}
