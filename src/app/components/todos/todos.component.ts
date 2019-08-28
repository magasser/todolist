import {Component, NgModule, OnInit} from '@angular/core';
import { TodoService } from '../../services/todo.service'
import { Todo } from '../../models/Todo';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  todos: Todo[];

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    // Remove from server and UI
    this.todoService.deleteTodo(todo).subscribe(() => this.todos = this.todos.filter(t => t.id !== todo.id));
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(() => {
      this.todos.push(todo);
    });
  }

}
