import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, UserService } from '../core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    title: String = '';
    isAuthenticated: boolean;
    listConfig: ArticleListConfig = {
        type: "all",
        filters:{}
    };
    tags: Array<string> = [];
    tagsLoaded = false;

    constructor(
        private router: Router,
        private userService: UserService
    ) {

    }

    ngOnInit() {
        this.title= 'Home';
        this.userService.isAuthenticated.subscribe(
            (authenticated) => {
                this.isAuthenticated = authenticated;
                console.log("authenticated", this.isAuthenticated);
                if(authenticated){
                    this.setListTo("feed");
                }else{
                    this.setListTo("all");
                }
            }
        );
    }

    setListTo(type: string = '', filters: Object = {}) {
        if(type === 'feed' && !this.isAuthenticated){
            this.router.navigateByUrl('/login');
            return;
        }

        this.listConfig = {type: type, filters: filters}
    }


}