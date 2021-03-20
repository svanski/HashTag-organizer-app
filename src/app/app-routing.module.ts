import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './security/autho.guard';
import { TasksViewComponent } from './tasks-view/tasks-view.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'taskst', component: TasksViewComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
