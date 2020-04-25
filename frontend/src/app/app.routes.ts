import { RouterModule, Routes } from '@angular/router';
import {HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const  ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**',pathMatch: 'full', redirectTo:'signin' }
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES, {useHash:true});