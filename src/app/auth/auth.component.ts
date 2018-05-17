/**
 * creating components
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth.component.html'
    
})
export class AuthComponent implements OnInit {
    title: String = '';
    
    constructor() {

    }

    ngOnInit(){
        this.title = "Auth Page";
    }
}