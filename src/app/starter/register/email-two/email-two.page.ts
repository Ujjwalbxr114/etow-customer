import {Component, OnInit} from '@angular/core';
import {EmailRegistrationService} from '../email-registration.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-email-two',
    templateUrl: './email-two.page.html',
    styleUrls: ['./email-two.page.scss', '../../email-shared.scss'],
})
export class EmailTwoPage implements OnInit {
    private valid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'u');

    constructor(public emailRegistrationService: EmailRegistrationService) {
    }

    ngOnInit() {
    }

    isValid(): Observable<boolean> {
        if (this.emailRegistrationService.emailRegistrationModel.email
            && this.emailRegistrationService.emailRegistrationModel.email !== ''
            && this.pattern.test(this.emailRegistrationService.emailRegistrationModel.email)
            && this.emailRegistrationService.emailRegistrationModel.password
            && this.emailRegistrationService.emailRegistrationModel.password !== ''
            && this.emailRegistrationService.emailRegistrationModel.password
            === this.emailRegistrationService.emailRegistrationModel.password_confirmation) {
            this.valid$.next(true);
        } else {
            this.valid$.next(false);
        }

        return this.valid$;
    }
}
