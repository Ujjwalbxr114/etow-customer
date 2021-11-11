import {Component} from '@angular/core';
import {ApiService} from '../services/api.service';
import {LoadingService} from '../services/loading.service';
import {ErrorPresentationService} from '../services/error-presentation.service';
import {ProfileService} from '../services/profile.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    constructor(public profileService: ProfileService,
                private navController: NavController,
                private apiService: ApiService,
                private loadingService: LoadingService,
                private errorPresentationService: ErrorPresentationService) {
        this.profileService.loadSelfProfile();
    }

    refreshProfile(event) {
        this.profileService.loadSelfProfileEvent(event);
    }

    logout() {
        this.loadingService.showForceLoading();
        this.apiService.authenticatedPost('/auth/logout', {})
            .subscribe(response => {
                    this.loadingService.hideLoading();
                    this.apiService.clearToken();
                    this.navController.navigateRoot('/', {replaceUrl: true});
                },
                err => {
                    this.loadingService.hideLoading();
                    this.errorPresentationService.handleServerError();
                });
    }
}
