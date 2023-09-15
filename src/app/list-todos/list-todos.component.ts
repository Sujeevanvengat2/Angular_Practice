import { Component, OnInit } from '@angular/core';
import { TodosService } from '../service/data/todos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

// export class todo {
//   constructor(
//     public id: Number,
//     public description: String,
//     public done: boolean,
//     public targetDate: Date
//   ) {}
// }
export interface Todo {
  id: Number;
  username: String;
  description: String;
  done: boolean;
  targetDate: Date;
}
@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss'],
})
export class ListTodosComponent implements OnInit {
  displayedColumns = [
    'id',
    'username',
    'description',
    'done',
    'targetDate',
    'edit',
    'delete',
  ];
  ELEMENT_DATA: Todo[] = [];
  dataSource = this.ELEMENT_DATA;

  // {id: 1, username: 'raki', description: 'learing spring',
  // done: false, date: '2023-06-19'}

  constructor(
    private todoService: TodosService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTableData();
  }
  getTableData() {
    this.todoService.getTodoTableData('sujeevan').subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = this.ELEMENT_DATA;
      console.log(response);
    });
  }
  handleDelete(event: any) {
    console.log(event);
    this.todoService
      .deleteTodoinTable(event.username, event.id)
      .subscribe((response) => {
        this.getTableData();
        console.log(response);
        this.openSnackBar(`Todo ${event.id}list deleted Successfullt`, '!!OK');
      });
  }
  handleEdit(event: any) {
    console.log(event);
    this.router.navigateByUrl(`/todo/${event.id}`);
  }
  addTodo() {
    this.router.navigate(['todo/-1']);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

// const ELEMENT_DATA: Element[] = [
//   // new todo(1, 'ram', false, new Date()),
//   // new todo(2, 'raki', false, new Date()),
//   // new todo(3, 'raju', false, new Date()),
//   {
//     id: response.id,
//     description: response.description,
//     done: false,
//     targetDate: new Date(),
//   },
//   { id: 2, description: 'raki', done: false, targetDate: new Date() },
//   { id: 3, description: 'raju', done: false, targetDate: new Date() },
// ];
