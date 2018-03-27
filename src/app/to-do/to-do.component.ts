import { Router } from '@angular/router';
import {Observable} from "rxjs";
import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Todo } from './to-do';
import { TodoService } from './to-do.service';

export enum SaveMode {
  None,
  New,
  Edit
}

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  formGroup: FormGroup;
  
  saveMode: SaveMode = SaveMode.None;
  headerText: string;
  
  @Input() todoId: number;

  todos: Todo[];

  constructor(private _todoService: TodoService, private _formBuilder: FormBuilder,private router: Router) {
    this.formGroup = _formBuilder.group({
      'id': '',
      'name': '',
      'date': '',
      'status': '',
      'description': ''});
  }

  
  ngOnInit() {
    this._todoService.getTodosFromData().subscribe((data: Todo[]) => {
      this.todos = data;
    });
  }

  saveTodo(todo: Todo) {    
      this._todoService.addTodo(todo).subscribe((response: any)=>{
        this._todoService.getTodosFromData().subscribe((data: Todo[]) => {
          this.todos = data;
          this.router.navigate(['']);
        });
      });
    this.saveMode = SaveMode.None;
  }

  removeToDo(todo: Todo) {
    console.log('inside removeTodo', todo);
    if (confirm("Are you sure you want to delete?")) {
      this._todoService.deleteTodo(todo.id).subscribe((data: any) => {
        this._todoService.getTodosFromData().subscribe((data: Todo[]) => {
          this.todos = data;
        });
      });
    }
    
  }

  cancelEditTodo() {
    this.formGroup.reset();
    this.saveMode = SaveMode.None;
  }

  showEditForm(todo: Todo) {
    if (!todo) {
      return;
    }
    this.saveMode = SaveMode.Edit;
    this.headerText = 'Edit To-Do';
    const editedTodo = Object.assign({}, todo, { date: this.applyLocale(todo.date) });
    this.formGroup.setValue(editedTodo);
  }

  showNewForm() {
    this.formGroup.reset();
    this.saveMode = SaveMode.New;
    this.headerText = 'New To-Do';
  }

  showForm() {
    return this.saveMode !== SaveMode.None;
  }

  applyLocale(date) {
    return new DatePipe(navigator.language).transform(date, 'y-MM-dd');
  }
}
