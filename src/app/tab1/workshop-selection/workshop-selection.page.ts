import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {ResourceCollection} from '../../interfaces/resource-collection';
import {WorkshopLocation} from '../../models/workshop-location';
import {ApiService} from '../../services/api.service';
import {Countries} from '../../enums/countries.enum';
import {Tab1Service} from '../tab1.service';
import {ErrorPresentationService} from '../../services/error-presentation.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-workshop-selection',
    templateUrl: './workshop-selection.page.html',
    styleUrls: ['./workshop-selection.page.scss'],
})
export class WorkshopSelectionPage implements OnInit {
    @Input()
    workshopSelected$: EventEmitter<WorkshopLocation> = new EventEmitter<WorkshopLocation>();
    searchWorkshop = '';
    public workshopData$: BehaviorSubject<ResourceCollection<WorkshopLocation>>
        = new BehaviorSubject<ResourceCollection<WorkshopLocation>>({data: []});

    constructor(private modalController: ModalController,
                private apiService: ApiService,
                private tab1Service: Tab1Service,
                private errorPresentationService: ErrorPresentationService) {
    }

    ngOnInit() {
        this.search();
    }

    startSearchIndicator() {
        this.workshopData$.next({data: []});
    }

    search() {
        const data = {
            name: null,
            country_code: Countries.SG,
            lat: this.tab1Service.searchLocation.lat.toString(),
            lng: this.tab1Service.searchLocation.lng.toString(),
        };
        if (this.searchWorkshop !== '') {
            data.name = this.searchWorkshop;
        }
        this.apiService.authenticatedGet('/workshops/search', data)
            .pipe(first())
            .subscribe(response => {
                if (response.data) {
                    this.workshopData$.next(response);
                }
            }, err => {
                if (err.status === 422) {
                    // validation errors
                    this.errorPresentationService.handleValidationErrors(err);
                } else {
                    this.errorPresentationService.handleServerError();
                }
            });
    }

    selectWorkshop(selectedWorkshop: WorkshopLocation) {
        this.workshopSelected$.emit(selectedWorkshop);
        this.dismissModal();
    }

    dismissModal() {
        this.modalController.dismiss();
    }
}
