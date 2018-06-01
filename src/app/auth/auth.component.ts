/**
 * creating components
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {Errors, UserService } from '../core';


@Component({
    selector: 'app-auth-page',
    templateUrl: './auth.component.html'
    
})
export class AuthComponent implements OnInit {
    authType: String = '';
    title: String = '';
    errors: Errors = {errors: {}};
    authForm : FormGroup;
    isSubmitting = false;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService
    ) {
        this.authForm = this.fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    ngOnInit(){
        this.route.url.subscribe(data => {
            this.authType = data[data.length -1].path;  
            this.title = (this.authType === 'login')? 'Sign in': 'Sign up';

            if(this.authType === 'register'){
                this.authForm.addControl('username', new FormControl());
            }
        });
    }

    submitForm(){
        const credentials = this.authForm.value;
        this.userService.attemptAuth(this.authType, credentials)
        .subscribe(
            (data) => {
              this.router.navigateByUrl('/'); 
            },
            (error) => {
                this.errors = error;
            }
        );
    }
}