import {Injectable} from '@angular/core';
import {EmailLoginModel} from './email-login-model';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmailLoginService {
    public emailLoginModel: EmailLoginModel = new EmailLoginModel();

    constructor(private apiService: ApiService) {
    }

    login(): Observable<any> {
        const data = {
            email: this.emailLoginModel.email,
            password: this.emailLoginModel.password,
            device_name: this.apiService.getDeviceName(),
        };
        // return this.apiService.post('/auth/login', data);
        return this.apiService.post('/user/login', data);

    }

    saveLoginToken(token: string): Observable<string> {
        return this.apiService.setToken(token);
    }
}
