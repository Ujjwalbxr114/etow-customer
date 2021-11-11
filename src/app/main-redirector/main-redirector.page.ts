import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-main-redirector',
    templateUrl: './main-redirector.page.html',
    styleUrls: ['./main-redirector.page.scss'],
})
export class MainRedirectorPage implements OnInit {

    constructor(private apiService: ApiService,
                private router: Router) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.apiService.hasToken()
            .subscribe(result => {
                if (result) {
                    this.router.navigateByUrl('/tabs', {replaceUrl: true});
                } else {
                    this.router.navigateByUrl('/starter', {replaceUrl: true});
                }
            });
    }

}
