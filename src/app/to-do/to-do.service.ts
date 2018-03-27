import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import { Todo } from './to-do';


@Injectable()
export class TodoService {
  pItems: Todo[] = [];
  private baseUrl: string = "http://127.0.0.1:8080/todos";

  constructor(private http: Http) { }

  getTodosFromData(): Observable<Todo[]>{
    const headers = new Headers();
	  headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    
    return this.http.get(this.baseUrl,{headers: headers, body:""}).map((response: Response) => response.json());
  }

  addTodo(todo: Todo){
    const body = JSON.stringify(todo);
    const headers = new Headers();
	  headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    
    return this.http.post(this.baseUrl, todo, {headers: headers});
  }

  updateTodo(todo: Todo) {
    const body = JSON.stringify(todo);
    const headers = new Headers();
	  headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    
    return this.http.put(this.baseUrl+"/"+todo.id, todo, {headers: headers}).map((response: Response) => response.json());
  }
  
  deleteTodo(todoId: number){
    const body = JSON.stringify({ todoId });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http.delete(this.baseUrl+"/"+todoId, {headers: headers, body:""});
  }

}