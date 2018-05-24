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
        console.log('error', error);
        return new ErrorObservable(error);
    }

    post(path: string, body: Object = {}): Observable<any>
    {
        var url =  `${environment.api_url}${path}`;
        var data = JSON.stringify(body);
        console.log('url',url);
        console.log('data',data);
        return this.http.post(url, data)
        .pipe(
            catchError(this.formatError) /*handle error on http */
        )
    }
}