import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {map, catchError} from 'rxjs/operators';

import { JwtService } from './jwt.services';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
        private jwtService: JwtService /*import injectable service */
    ){
    }

    private formatError(error: any){
        return new ErrorObservable(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any>
    {
        return this.http.get(`${environment.api_url}${path}`, { params })
            .pipe(
                catchError(this.formatError)
            )
    }

    post(path: string, body: Object = {}): Observable<any>
    {
        var url =  `${environment.api_url}${path}`;
        var data = JSON.stringify(body);
        return this.http.post(url, data)
        .pipe(
            catchError(this.formatError) /*handle error on http */
        )
    }

    put(path: string, body: Object = {}): Observable<any>
    {
        return this.http.put(`${environment.api_url}${path}`,
                                JSON.stringify(body))
                                .pipe(
                                    catchError(this.formatError)
                                );
    }
}