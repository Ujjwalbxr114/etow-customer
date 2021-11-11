import {Component, OnInit} from '@angular/core';
import {EmailRegistrationService} from '../email-registration.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-email-one',
    templateUrl: './email-one.page.html',
    styleUrls: ['./email-one.page.scss', '../../email-shared.scss'],
})
export class EmailOnePage implements OnInit {
    private valid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(public emailRegistrationService: EmailRegistrationService) {
    }

    ngOnInit() {
    }

    isValid(): Observable<boolean> {
        if (this.emailRegistrationService.emailRegistrationModel.first_name
            && this.emailRegistrationService.emailRegistrationModel.first_name !== ''
            && this.emailRegistrationService.emailRegistrationModel.last_name
            && this.emailRegistrationService.emailRegistrationModel.last_name !== ''
            && this.emailRegistrationService.emailRegistrationModel.date_of_birth
            && this.emailRegistrationService.emailRegistrationModel.date_of_birth !== ''
            && this.emailRegistrationService.emailRegistrationModel.phone_number
            && this.emailRegistrationService.emailRegistrationModel.phone_number !== '') {
            this.valid.next(true);
        } else {
            this.valid.next(false);
        }

        return this.valid;
    }
}
