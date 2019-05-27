import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './guards/auth.guard';
import { CourseListPageComponent } from './pages/course-list-page/course-list-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';


const routes: Routes = [
  { 
    path: 'login', 
    component: LoginPageComponent 
  },
  {
    path: 'profile/:username',
    component: ProfilePageComponent
  },
  { 
    path: 'dashboard/:username', 
    component: DashboardPageComponent, 
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CourseListPageComponent
      }
    ]
  },
  { 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full' },
  { path: '**', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
