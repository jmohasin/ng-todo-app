import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToDoComponent } from './to-do/to-do.component';
import { TodoService } from './to-do/to-do.service';
import { FontsService } from '../fonts/fonts.service';

const ROUTES: Routes = [
  { path: "home", component: AppComponent },
  { path: "", component: AppComponent },  
  { path: "", component: AppComponent, pathMatch: 'full'},
];
@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [TodoService, FontsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
