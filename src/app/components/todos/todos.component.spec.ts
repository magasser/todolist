import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import {AddTodoComponent} from '../add-todo/add-todo.component';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Todo} from '../../models/Todo';
import {observable, Observable, of} from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodosComponent,
        TodoItemComponent,
        AddTodoComponent
      ],

      imports: [
        FormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    component.todos = [
      {
        id: 1,
        title: 'Todo 1',
        completed: false,
      },
      {
        id: 2,
        title: 'Todo 2',
        completed: false,
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call TodoService.getTodos() when ngOnInit() is called', () => {
    spyOn(component.todoService, 'getTodos').and.returnValue(new Observable<Todo[]>());
    component.ngOnInit();
    expect(component.todoService.getTodos).toHaveBeenCalled();
  });

  it('should set values of \'todos\' array when ngOnInit() is called', async(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    console.log(component.todos);
    const todos: Todo[] = [
      {
        id: 999,
        title: 'Todo 999',
        completed: true,
      }
    ];
    spyOn(component.todoService, 'getTodos').and.returnValue(of(todos));
    expect(component.todos).not.toBeDefined();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.todos).toEqual(todos);
  }));

  it('should call TodoService.deleteTodo() when deleteTodo() is called', () => {
    spyOn(component.todoService, 'deleteTodo').and.returnValue(new Observable<Todo>());
    const todo: Todo = component.todos[0];
    component.deleteTodo(todo);
    expect(component.todoService.deleteTodo).toHaveBeenCalledWith(todo);
  });

  it('should call TodoService.addTodo() when addTodo() is called', () => {
    spyOn(component.todoService, 'addTodo').and.returnValue(new Observable<Todo>());
    const todo: Todo = {id: 3, title: 'Todo 3', completed: false };
    component.addTodo(todo);
    expect(component.todoService.addTodo).toHaveBeenCalledWith(todo);
  });

  it('should delete given todo from \'todos\' array when deleteTodo() is called', async(() => {
    const todo: Todo = component.todos[0];
    spyOn(component.todoService, 'deleteTodo').and.returnValue(of(todo));
    expect(component.todos).toContain(todo);
    component.deleteTodo(todo);
    fixture.detectChanges();
    expect(component.todos).not.toContain(todo);
  }));

  it('should add given todo to \'todos\' array when addTodo() is called', async(() => {
    const todo: Todo = {id: 3, title: 'Todo 3', completed: false };
    spyOn(component.todoService, 'addTodo').and.returnValue(of(todo));
    expect(component.todos).not.toContain(todo);
    component.addTodo(todo);
    fixture.detectChanges();
    expect(component.todos).toContain(todo);
  }));
});
