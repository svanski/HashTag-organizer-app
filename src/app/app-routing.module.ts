import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './security/autho.guard';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksViewComponent } from './tasks-view/tasks-view.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'tasks', component: TasksViewComponent, canActivate: [AuthGuard] },
  { path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard] },
  { path: 'task/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
