import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TodosService } from '../service/data/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor(
    // public dialogref: MatDialogRef<TodoComponent>,
    private todoService: TodosService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  form!: FormGroup;
  username = new FormControl('');
  description = new FormControl('', [Validators.required]);
  targetDate = new FormControl('', [Validators.required]);
  id!: number;
  todo!: Todo;
  ngOnInit(): void {
    // this.dialogref.open(DialogBo);
    this.intiForm();
    this.id = this.route.snapshot.params['id'];
    if (this.id != -1) {
      this.todoService
        .retreiveTodo('sujeevan', this.id)
        .subscribe((response) => {
          this.todo = response;
          this.form.patchValue({
            id: this.todo.id,
            username: this.todo.username,
            description: this.todo.description,
            targetDate: this.todo.targetDate,
          });
        });
    }
  }
  //
  intiForm() {
    this.form = this.formBuilder.group({
      id: this.id,
      username: this.username,
      description: this.description,
      targetDate: this.targetDate,
    });
    // {id: 2, username: 'ram', description: 'learing cloud', done: false, targetDate: '2023-06-19'}
  }

  // onclose() {
  //   this.dialogref.close();
  // }
  onSubmit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id != -1) {
      this.todoService.updateTodo(this.form.value).subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/todos');
      });
    } else {
      this.todoService.addTodo(this.form.value).subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/todos');
      });
    }
  }
}
