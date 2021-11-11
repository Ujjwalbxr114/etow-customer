import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {ApiService} from './api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorPresentationService} from './error-presentation.service';
import {LoadingService} from './loading.service';
import {first} from 'rxjs/operators';
import { VehicleInterface } from '../interfaces/vehicle-interface';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    public user: User = new User();
    public vehicle : VehicleInterface ;
    

    constructor(private apiService: ApiService,
                private loadingService: LoadingService,
                private errorPresentationService: ErrorPresentationService) {
    }

    loadSelfProfileEvent(event) {
        this.apiService.authenticatedGet('/users/self', {})
            .pipe(first())
            .subscribe(response => {
                // TODO: check if mapping works
                this.user = response;
                event.target.complete();
            }, (err: HttpErrorResponse) => {
                this.errorPresentationService.handleServerError();
            });
    }

    loadSelfProfile() {
        this.apiService.authenticatedGet('/users/self', {})
            .pipe(first())
            .subscribe(response => {
                // TODO: check if mapping works
                this.user = response;
            }, (err: HttpErrorResponse) => {
                this.errorPresentationService.handleServerError();
            });
    }

    updateSelfProfile() {
        this.loadingService.showForceLoading();
        const data = {
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            email: this.user.email,
            allow_marketing: this.user.allow_marketing ? '1' : '0',
            gender: this.user.gender,
            
        };
        this.apiService.authenticatedPost('/users/self', data)
            .pipe(first())
            .subscribe(response => {
                this.loadingService.hideLoading();
                // TODO: check if mapping works
                this.user = response;
            }, (err: HttpErrorResponse) => {
                this.loadingService.hideLoading();
                if (err.status === 422) {
                    // validation errors
                    this.errorPresentationService.handleValidationErrors(err);
                } else {
                    this.errorPresentationService.handleServerError();
                }
            });
    }
}
