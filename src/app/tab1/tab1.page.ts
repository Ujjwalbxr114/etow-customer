import {Component, Input} from '@angular/core';
import {Platform} from '@ionic/angular';
import {GoogleMap, GoogleMapOptions, GoogleMaps} from '@ionic-native/google-maps/ngx';
import {Tab1Service} from './tab1.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    constructor(private platform: Platform,
                public tab1Service: Tab1Service) {
    }

    async ngOnInit() {
        await this.platform.ready();
        await this.loadMap();
    }

    loadMap() {
        const options: GoogleMapOptions = {
            controls: {
                compass: false,
                indoorPicker: false,
                mapToolbar: false,
                myLocationButton: false,
            },
        };
        this.tab1Service.map = GoogleMaps.create(this.tab1Service.MAP_ELEMENT, options);
    }
}
