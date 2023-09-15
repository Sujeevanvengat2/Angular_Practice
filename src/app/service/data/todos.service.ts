import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, TODO_JPA_API_URL } from 'src/app/app.constants';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}
  getTodoTableData(username: String) {
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/users/${username}/todo`);
  }
  deleteTodoinTable(username: String, id: number) {
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/todo/${id}`);
  }
  retreiveTodo(username: String, id: number) {
    return this.http.get<Todo>(
      `${TODO_JPA_API_URL}/users/${username}/todo/${id}`
    );
  }
  // users/{username}/todo/{id}
  updateTodo(obj: Todo) {
    console.log(obj.targetDate);
    return this.http.put<any>(
      `${TODO_JPA_API_URL}/users/${obj.username}/todo/${obj.id}`,
      obj
    );
  }
  addTodo(obj: any) {
    obj.username = 'sujeevan';
    return this.http.post<any>(
      ` ${TODO_JPA_API_URL}/users/${obj.username}/todo`,
      obj
    );
  }
}
