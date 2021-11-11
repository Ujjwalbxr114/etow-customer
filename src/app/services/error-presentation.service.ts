import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorPresentationService {
    constructor(private alertController: AlertController) {
    }

    handleValidationErrors(err: HttpErrorResponse) {
        if (err.error.errors) {
            for (const errorName in err.error.errors) {
                if (err.error.errors.hasOwnProperty(errorName)) {
                    const error = err.error.errors[errorName];
                    if (Array.isArray(error) && error.length > 0) {
                        this.presentAlert('Validation Error', error[0]);
                        break;
                    }
                }
            }
        }
    }

    handleServerError() {
        this.presentAlert('Server Error', 'We encountered some server issues while trying to process your request.');
    }

    async presentAlert(header: string, message: string) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons: ['OK']
        });

        alert.present();
    }
}
