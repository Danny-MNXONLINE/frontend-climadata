import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { AuthGuard } from './guards/auth-guard';
import { Landing } from './components/landing/landing';
import { NotFound } from './components/not-found/not-found';
import { Register } from './components/register/register';
import { Footer } from './layouts/footer/footer';

export const routes: Routes = [
    {
        path: '',
        component: Footer,
        children: [
            {
                path: '',
                component: Landing

            },
            {
                path: 'login',
                component: Login
            },
            {
                path: 'dashboard',
                component: Dashboard,
                canActivate: [AuthGuard]
            },
            {
                path: 'register',
                component: Register
            }
        ]
    }
];
