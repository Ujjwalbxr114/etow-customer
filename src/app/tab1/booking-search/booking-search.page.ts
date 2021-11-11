import {Component, OnInit} from '@angular/core';
import {BackgroundMode, BackgroundModeConfiguration} from '@ionic-native/background-mode/ngx';
import {Tab1Service} from '../tab1.service';

@Component({
    selector: 'app-tab1-booking-search',
    templateUrl: './booking-search.page.html',
    styleUrls: ['./booking-search.page.scss', '../tab1.page.scss'],
})
export class BookingSearchPage implements OnInit {

    constructor(public tab1Service: Tab1Service,
                private backgroundMode: BackgroundMode) {
        this.backgroundMode.disableBatteryOptimizations();
        const backgroundConfig: BackgroundModeConfiguration = {
            silent: false,
            hidden: false,
            title: 'Searching for tow trucks',
        };
        this.backgroundMode.configure(backgroundConfig);
    }

    ngOnInit() {
        this.backgroundMode.enable();
    }

    backButton() {
        this.tab1Service.decrementStep();

        this.backgroundMode.disable();
    }
}
