import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MiniTileComponent } from './mini-tile/mini-tile.component';

import { VIEW_TASK_DETAILS_MEDIATOR } from './common/actions.mediator';

import { Subject } from 'rxjs';
import { ITask } from './common/models';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { LimitTextLengthPipe } from './limit-text-length.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    SearchBarComponent,
    MiniTileComponent,
    TasksViewComponent,
    PageNotFoundComponent,
    TaskDetailComponent,
    LimitTextLengthPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [
    { provide: VIEW_TASK_DETAILS_MEDIATOR, useValue: new Subject<ITask | undefined>() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
