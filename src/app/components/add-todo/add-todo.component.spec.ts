import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter} from '@angular/core';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTodoComponent ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    component.addTodo = new EventEmitter<any>();
    component.title = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call emit() with correct value from addTodo EventEmitter when onSubmit() is called', () => {
    const todo = {
      title: 'test',
      completed: false,
    }
    spyOn(component.addTodo, 'emit');
    component.onSubmit();
    expect(component.addTodo.emit).toHaveBeenCalledWith(todo);
  });
});
