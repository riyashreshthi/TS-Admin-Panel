import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { RegisterComponent } from '../app/pages/register/register.component';
import { PageNotFoundComponent } from '../app/pages/page-not-found/page-not-found.component';

import { AuthGuardGuard } from '../app/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    canActivate: [AuthGuardGuard],
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthGuardGuard],
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      canActivate: [AuthGuardGuard]
    }]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    },

];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
