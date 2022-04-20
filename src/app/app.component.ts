import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covinoc';
  // taskArray: Task[] = [
  //   { id: 1, name: "Luis", state: true },
  //   { id: 2, name: "Carlos", state: false },
  //   { id: 3, name: "Ryan", state: false },
  // ];

  // Esta instancia de nuevo el modelo cada que se inicie lo coloca en blanco
  // selectTask: Task = new Task();

  // addOrEdit() {
  //   // Agregamos un dato mas al arreglo
  //   this.selectTask.id = this.taskArray.length + 1;

  //   this.taskArray.push(this.selectTask);

  //   // Para borrar los input luego de insertar
  //   this.selectTask = new Task();
  // }
}
