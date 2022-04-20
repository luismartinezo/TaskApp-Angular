import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const cabecera = { headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  task!: Task[];
  constructor(private httpClient: HttpClient) { }

  public getTask(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(environment.URL + '/todos', cabecera);
  }

  public addTask(task: Task): Observable<Task[]> {
    return this.httpClient.post<Task[]>(environment.URL + '/todos', task, cabecera);
  }

  public deleteTask(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.URL + `/todos/${id}`, cabecera);
  }
  public updateTask(id: number,task: Task): Observable<any> {
    return this.httpClient.put<any>(environment.URL + `/todos/${id}`, task, cabecera);
  }
}
