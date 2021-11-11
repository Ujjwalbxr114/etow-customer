import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TabsService {
    public readonly tabsEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor() {
    }

    public setTabsEnabled() {
        this.tabsEnabled.next(true);
    }

    public setTabsDisabled() {
        this.tabsEnabled.next(false);
    }
}
