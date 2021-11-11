import { Component } from '@angular/core';
import { GoogleMaps,GoogleMapsEvent,LatLng,MarkerOptions,Marker } from '@ionic-native/google-maps';
import{ProfileService} from '../services/profile.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public profileService : ProfileService,
    public apiService: ApiService,
  ) {}

  loadmap(){
    const map=GoogleMaps.create('map');
    map.one(GoogleMapsEvent.MAP_READY).then((data:any) => {
      const cooridnates:LatLng = new LatLng(41,-87);

      map.setCameraTarget(cooridnates);
      map.setCameraZoom(8);
    });
  }

}
