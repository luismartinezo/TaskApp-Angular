import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/Models/Task';
import { TaskService } from 'src/app/Services/task.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, AfterViewInit {
  tasks: Task[] = [];
  public displayedColumns: string[] = ['id', 'title', 'state', 'borrar'];
  public dataSource = new MatTableDataSource<any>();
  checked = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private taskService: TaskService) {

  }

  getTask() {
    this.taskService.getTask()
      .subscribe((res) => {
        // console.log(res[0].state);
        this.dataSource.data = res;

        for (let i = 0; i < this.dataSource.data.length; i++) {

          this.checked = this.dataSource.data[i].state;
        }
      })
  }

  deleteTask(id: number) {
    if (id != null || id == 0)
      // if (confirm(`Seguro que desea eliminar el registro ${id}`)) {
      //   this.taskService.deleteTask(id).subscribe((resp) => {
      //     window.location.reload();
      //   });
      // }
      Swal.fire({
        title: `Seguro que desea eliminar el registro ${id}?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ok',
        denyButtonText: `No Eliminar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.taskService.deleteTask(id).subscribe((resp) => {
            Swal.fire('Eliminado!', '', 'success')
                window.location.reload();
              });
         
        } else if (result.isDenied) {
          Swal.fire('El registro no fue eliminado', '', 'info')
        }
      })
  }

  updateTask(id: number, task: any) {
    if (id != null || id == 0)
      Swal.fire({
        title: `Deseas actualizar la tarea ${id}?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ok',
        denyButtonText: `No Actualizar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.taskService.updateTask(id, task).subscribe((resp) => {
            Swal.fire('Tarea Actualizada!', '', 'success')
                window.location.reload();
              });
         
        } else if (result.isDenied) {
          Swal.fire('La Tarea no se Actualizó', '', 'info')
        }
      })


  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.getTask();
  }

}

