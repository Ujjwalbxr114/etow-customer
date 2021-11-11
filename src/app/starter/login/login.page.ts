import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {EmailLoginService} from './email-login.service';
import {first, flatMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorPresentationService} from '../../services/error-presentation.service';
import {ProfileService} from '../../services/profile.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss', '../email-shared.scss'],
})
export class LoginPage implements OnInit {
    private valid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private navController: NavController,
                public emailLoginService: EmailLoginService,
                public profileService: ProfileService,
                public errorPresentationService: ErrorPresentationService) {
    }

    ngOnInit() {
    }

    isValid(): Observable<boolean> {
        if (this.emailLoginService.emailLoginModel.email
            && this.emailLoginService.emailLoginModel.email !== ''
            && this.emailLoginService.emailLoginModel.password
            && this.emailLoginService.emailLoginModel.password !== '') {
            this.valid$.next(true);
        } else {
            this.valid$.next(false);
        }

        return this.valid$;
    }

    // login() {
    //     this.emailLoginService
    //         .login()
    //         .pipe(
    //             first(),
    //             flatMap(response => {
    //                 if (response.token) {
    //                     this.profileService.user = response.user;
    //                     return this.emailLoginService.saveLoginToken(response.token);
    //                 }


    //                 throw new HttpErrorResponse({status: 500});
    //             })
    //         )
    //         .subscribe(
    //             () => {
    //                 this.navController.navigateRoot('/tabs', {replaceUrl: true});
    //             }, (err: HttpErrorResponse) => {
    //                 if (err.status === 422) {

    //                     this.errorPresentationService.handleValidationErrors(err);
    //                 } else {
    //                     this.errorPresentationService.handleServerError();
    //                 }
    //             }
    //         );
    // }
}
