import {Component, OnInit} from '@angular/core';
import {Tab1Service} from '../tab1.service';
import {VehicleServiceCategory} from '../../interfaces/vehicle-service-category';
import {ApiService} from '../../services/api.service';
import {ErrorPresentationService} from '../../services/error-presentation.service';
import {TabsService} from '../../tabs/tabs.service';

@Component({
    selector: 'app-tab1-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss', '../tab1.page.scss'],
})
export class MainPage implements OnInit {

    constructor(public tab1Service: Tab1Service,
                private tabsService: TabsService,
                private apiService: ApiService,
                private errorPresentationService: ErrorPresentationService) {
    }

    ngOnInit() {
        this.apiService.authenticatedGet('/vehicle-service-categories', {})
            .subscribe(response => {
                if (response.data) {
                    this.tab1Service.serviceCategories$.next(response);
                }
            }, err => {
                this.errorPresentationService.handleServerError();
            });
    }

    callServiceCat(vhServiceCat: VehicleServiceCategory) {
        this.tab1Service.selectedServiceCategory$.next(vhServiceCat);
        this.tab1Service.incrementStep();
        // Hide tabs on enter
        this.tabsService.setTabsDisabled();
        console.log('hide tabs');
    }
}
