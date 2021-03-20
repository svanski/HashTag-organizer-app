import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './security/autho.guard';

const routes: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
