import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Tasks } from './components/tasks/tasks';

export const routes: Routes = [

    {
        path: '',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'tasks',
        component: Tasks
    },
    {
        path: '**',
        redirectTo: ''
    }
];
