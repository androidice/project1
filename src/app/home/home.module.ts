import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';


@NgModule({
    imports: [
        SharedModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule {}