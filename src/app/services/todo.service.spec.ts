import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Todo} from '../models/Todo';
import any = jasmine.any;
import {HttpHeaders} from '@angular/common/http';

describe('TodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.get() when getTodos() is called', () => {
    const service: TodoService = TestBed.get(TodoService);
    spyOn(service.http, 'get');
    service.getTodos();
    expect(service.http.get).toHaveBeenCalledWith(`${service.todosUrl}${service.todosLimit}`);
  });

  it('should call HttpClient.delete() when deleteTodo() is called', () => {
    const service: TodoService = TestBed.get(TodoService);
    const todo: Todo = {id: 1, title: 'Todo 1', completed: false};
    spyOn(service.http, 'delete');
    service.deleteTodo(todo);
    expect(service.http.delete).toHaveBeenCalledWith(`${service.todosUrl}/${todo.id}`, any(Object));
  });

  it('should call HttpClient.post() when addTodo() is called', () => {
    const service: TodoService = TestBed.get(TodoService);
    const todo: Todo = {id: 1, title: 'Todo 1', completed: false};
    spyOn(service.http, 'post');
    service.addTodo(todo);
    expect(service.http.post).toHaveBeenCalledWith(service.todosUrl, todo, any(Object));
  });

  it('should call HttpClient.put() when toggleCompleted() is called', () => {
    const service: TodoService = TestBed.get(TodoService);
    const todo: Todo = {id: 1, title: 'Todo 1', completed: false};
    spyOn(service.http, 'put');
    service.toggleCompleted(todo);
    expect(service.http.put).toHaveBeenCalledWith(`${service.todosUrl}/${todo.id}`, todo, any(Object));
  });
});
