import {Component, ElementRef, OnInit} from '@angular/core';
import {EmailRegistrationService} from '../email-registration.service';
import {IonInput} from '@ionic/angular';
import {isNumeric} from 'rxjs/internal-compatibility';

@Component({
    selector: 'app-phone-verify',
    templateUrl: './phone-verify.page.html',
    styleUrls: ['./phone-verify.page.scss', '../../email-shared.scss'],
})
export class PhoneVerifyPage implements OnInit {

    constructor(public emailRegistrationService: EmailRegistrationService) {
    }

    ngOnInit() {
    }

    otpController(event: Event, self: IonInput, next?: IonInput, prev?: IonInput): void {
        if (self.value.toLocaleString().length < 1 && prev) {
            prev.setFocus();
            return;
        }

        if (!isNumeric(self.value)) {
            self.value = '';
            return;
        }

        if (next && self.value.toLocaleString().length > 0) {
            next.setFocus();
        }
    }
}
