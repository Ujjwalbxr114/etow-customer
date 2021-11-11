import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loading$: BehaviorSubject<HTMLIonLoadingElement> = new BehaviorSubject<HTMLIonLoadingElement>(null);

    constructor(private loadingController: LoadingController) {
    }

    async showForceLoading() {
        this.loading$.next(await this.loadingController.create({
            message: 'Loading...',
            showBackdrop: true,
        }));
        await this.loading$
            .getValue()
            .present();
    }

    hideLoading() {
        this.loading$
            .pipe(takeWhile(data => data === null, true))
            .subscribe(async loadingEle => {
                if (loadingEle !== null) {
                    const topLoading = await this.loadingController.getTop();
                    topLoading.dismiss();
                }
            });
    }
}
