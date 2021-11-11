import {Injectable} from '@angular/core';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {EmailRegistrationService} from '../email-registration.service';
import {PhoneVerifyPage} from './phone-verify.page';

// Prevent leaving of code entering page
@Injectable({
    providedIn: 'root'
})
export class PhoneVerifyGuard implements CanDeactivate<PhoneVerifyPage> {
    constructor(private emailRegistrationService: EmailRegistrationService) {
    }

    canDeactivate(
        component: PhoneVerifyPage,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
        return this.emailRegistrationService.phoneVerified$;
    }
}
