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




import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MiniTileComponent } from './mini-tile/mini-tile.component';
import { ActionsBarComponent } from './actions-bar/actions-bar.component';

import { CREATE_NEW_TASK_MEDIATOR } from './actions.mediator';

import { Subject } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    SearchBarComponent,
    MiniTileComponent,
    ActionsBarComponent
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
    MatBadgeModule
  ],
  providers: [
    { provide: CREATE_NEW_TASK_MEDIATOR, useValue: new Subject<undefined>() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
