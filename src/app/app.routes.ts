import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { AuthGuard } from './guards/auth-guard';
import { Landing } from './components/landing/landing';
import { NotFound } from './components/not-found/not-found';
import { Register } from './components/register/register';
import { Footer } from './layouts/footer/footer';
import { Aside } from './layouts/aside/aside';
import { AuthHeader } from './layouts/auth-header/auth-header';
import { PanelAq } from './components/panel-aq/panel-aq';

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
                path: '',
                component: AuthHeader,
                children: [
                    {
                        path: '',
                        component: Aside,
                        canActivate: [AuthGuard],
                        children: [
                            {
                                path: 'dashboard',
                                component: Dashboard,
                                canActivate: [AuthGuard]
                            },
                            {
                                path: 'panel',
                                component: PanelAq,
                                canActivate: [AuthGuard]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'register',
                component: Register
            }
        ]
    }
];
