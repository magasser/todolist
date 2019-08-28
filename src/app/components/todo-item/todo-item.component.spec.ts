import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';
import {Todo} from '../../models/Todo';
import {Observable} from 'rxjs';
import {EventEmitter} from '@angular/core';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoItemComponent
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = {
      id: 1,
      title: 'Todo Test',
      completed: false,
    };
    component.deleteTodo = new EventEmitter<Todo>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle completed value when onToggle() is called', () => {
    component.onToggle(component.todo);
    expect(component.todo.completed).toBe(true);
  });

  it('should call TodoService.toggleCompleted() when onToggle() is called', () => {
    spyOn(component.todoService, 'toggleCompleted').and.returnValue(new Observable<Todo>());
    component.onToggle(component.todo);
    expect(component.todoService.toggleCompleted).toHaveBeenCalledWith(component.todo);

  });

  it('should call emit() of deleteTodo EventEmitter when onDelete() is called', () => {
    spyOn(component.deleteTodo, 'emit');
    component.onDelete(component.todo);
    expect(component.deleteTodo.emit).toHaveBeenCalledWith(component.todo);
  });

  it('should return correct classes values when setClasses() is called', () => {
    const result = component.setClasses();
    expect(result).toEqual({todo: true, 'is-complete': false});
  });
});
