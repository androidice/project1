import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ReplaySubject } from 'rxjs/ReplaySubject'

import { JwtService } from './jwt.services';
import { ApiService } from './api.services';

import { User } from '../models';

import { map, catchError } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
     
    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private jwtService : JwtService
    )
    {}

    populate(){
        if(this.jwtService.getToken()){
            this.apiService.get('/user')
            .subscribe(
                data=> this.setAuth(data.user),
                err => this.purgeAuth()
            );
        }else{
            this.purgeAuth();
        }
    }

    setAuth(user: User){
        this.jwtService.saveToken(user.token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    purgeAuth(){
        this.jwtService.destroyToken();
        this.currentUserSubject.next({} as User);
        this.isAuthenticatedSubject.next(false);
    }

    attemptAuth(type, credentials): Observable<User>{
        const route = (type === "login")? '/login': '';
        return this.apiService.post(`/users${route}`, {user: credentials})
        .pipe(
            map((data)=>{
                console.log('data', data)
                return data;
            })
        )
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    update(user): Observable<User> {
        return this.apiService.put('/user', {user})
        .pipe(
            map(data => {
                this.currentUserSubject.next(data.user);
                return  data.user;
            })
        );

    }
}