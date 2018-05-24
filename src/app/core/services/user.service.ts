import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ReplaySubject } from 'rxjs/ReplaySubject'

import { JwtService } from './jwt.services';
import { ApiService } from './api.services';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private jwtService : JwtService
    )
    {}


    attemptAuth(type, credentials){
        const route = (type === "login")? '/login': '';
        return this.apiService.post(`/users${route}`, {user: credentials})
        .pipe(
            map((data)=>{
                console.log('data', data)
                return data;
            })
        )
       
    }
}