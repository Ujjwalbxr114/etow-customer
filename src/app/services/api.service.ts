import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Device} from '@ionic-native/device/ngx';
import {first, flatMap, map, tap} from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private tokenKeyName = 'USER_TOKEN';

    constructor(private http: HttpClient,
                private deviceInfo: Device,
                private storage: Storage,
                private router: Router) {
        this.setupCsrfCookie();
    }

    public getHostnameUrl(): string {
        return environment.hostnameWithoutPath;
    }

    public getEndpointHostUrl(): string {
        return environment.endpointHostUrl;
    }

    public getDeviceName(): string {
        return this.deviceInfo.platform + ' ' + this.deviceInfo.manufacturer + ' ' + this.deviceInfo.model;
    }

    public get(path: string, data: { [param: string]: string }): Observable<any> {
        let params = new HttpParams();
        for (const dataKey in data) {
            if (dataKey && data[dataKey]) {
                params = params.set(dataKey, data[dataKey]);
            }
        }
        const options = {
            headers: this.getJsonHeaders(),
            params,
        };
        return this.http.get<any>(this.getEndpointHostUrl() + path, options);
    }

    public post(path: string, data: { [param: string]: string | string[] }): Observable<any> {
        const options = {
            headers: this.getJsonHeaders(),
        };
        return this.http.post<any>(this.getEndpointHostUrl() + path, data, options);
    }

    public authenticatedGet(path: string, data: { [param: string]: string }): Observable<any> {
        return this.getAuthenticatedJsonHeaders()
            .pipe(
                flatMap(headers => {
                    let params = new HttpParams();
                    for (const dataKey in data) {
                        if (dataKey && data[dataKey]) {
                            params = params.set(dataKey, data[dataKey]);
                        }
                    }
                    const options = {
                        headers,
                        params,
                        withCredentials: true,
                    };
                    return this.http.get<any>(this.getEndpointHostUrl() + path, options);
                }),
                tap(() => {
                }, (err: HttpErrorResponse) => {
                    // Force logout if unauthorized OR forbidden
                    if (err.status === 401 || err.status === 403) {
                        this.clearToken().pipe(first()).subscribe(() => {
                            this.router.navigateByUrl('/', {replaceUrl: true});
                        });
                    }
                }),
            );
    }

    public authenticatedPost(path: string, data: { [param: string]: string | string[] }): Observable<any> {
        return this.getAuthenticatedJsonHeaders()
            .pipe(
                flatMap(headers => {
                    const options = {
                        headers,
                        withCredentials: true,
                    };
                    return this.http.post<any>(this.getEndpointHostUrl() + path, data, options);
                })
            );
    }

    private getJsonHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        });
    }

    private getAuthenticatedJsonHeaders(): Observable<HttpHeaders> {
        return this.getToken()
            .pipe(
                flatMap(token => {
                    return of(new HttpHeaders({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + token,
                    }));
                })
            );
    }

    private setupCsrfCookie(): void {
        this.http.get<any>(this.getHostnameUrl() + '/sanctum/csrf-cookie')
            .pipe(first())
            .subscribe(() => {
                // TODO: make xsrf / csrf work
            });
    }

    public hasToken(): Observable<boolean> {
        return this.getToken()
            .pipe(
                first(),
                map<string, boolean>(token => {
                    return token && token !== '';
                })
            );
    }

    public hasNoToken(): Observable<boolean> {
        return this.getToken()
            .pipe(
                first(),
                map<string, boolean>(token => {
                    return !token || token === '' || token === null;
                })
            );
    }

    public setToken(token: string): Observable<string> {
        return from(this.storage.set(this.tokenKeyName, token));
    }

    public clearToken(): Observable<any> {
        return from(this.storage.remove(this.tokenKeyName));
    }

    private getToken(): Observable<string> {
        return from(this.storage.get(this.tokenKeyName))
            .pipe(map<any, string>(retrievedToken => {
                if (typeof retrievedToken === 'string') {
                    return retrievedToken;
                } else {
                    return null;
                }
            }));
    }
}
