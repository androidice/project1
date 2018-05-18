/**
 * creating components
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth.component.html'
    
})
export class AuthComponent implements OnInit {
    authType: String = '';
    title: String = '';
    authForm : FormGroup;
    isSubmitting = false;
    
    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder
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
        console.log('credentials', credentials);
        console.log('submitting form');
    }
}