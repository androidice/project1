import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    title: String = '';
    constructor() {

    }
    ngOnInit() {
        this.title= 'Home';
    }
}