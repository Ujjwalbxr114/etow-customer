import { Injectable } from '@angular/core';
import { WorkshopLocation } from '../models/workshop-location';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorPresentationService } from './error-presentation.service';
import { LoadingService } from './loading.service';
import { first } from 'rxjs/operators';
import { VehicleInterface } from '../interfaces/vehicle-interface';
import { User } from '../models/user';
import { GpsLocation } from '../models/gps-location';

@Injectable({
  providedIn: 'root'
})
export class TowRequestService {
  public user: User = new User();
  public vehicle : VehicleInterface;
  public gpsLocation : GpsLocation;

  constructor(
    private apiService : ApiService,
    private loadingService : LoadingService,
    private errorPresentationService : ErrorPresentationService
  ) { }



  loadSelfTowRequestEvent(event){
    this.apiService.authenticatedGet('/bookings/self' ,{})
    .pipe(first())
    .subscribe(response => {
      this.vehicle = response;
      event.target.complete();
    }, (err:HttpErrorResponse) =>{
      this.errorPresentationService.handleServerError();
    });
  }

  loadSelfTowRequest(){
    this.apiService.authenticatedGet('/bookings/self' , {})
    .pipe(first())
    .subscribe(response =>{
      this.vehicle = response;
    }, (err: HttpErrorResponse) => {
      this.errorPresentationService.handleServerError();
    })
  }


  updateSelfTowRequest(){
    this.loadingService.showForceLoading();
    const data = {
      

    }
  }
}
