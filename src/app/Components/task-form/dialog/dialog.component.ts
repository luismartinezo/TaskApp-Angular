import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/Services/task.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  taskForm!: FormGroup;
  constructor(public fb: FormBuilder, private taskService: TaskService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.reactiveForm();
  }

  /* Reactive form */
  reactiveForm() {
    this.taskForm = this.fb.group({
      id: [1],
      createdAt: ['', Validators.required],
      state: [Validators.required],
      title: ['', Validators.required]
    });
  }
  
  public errorHandling = (control: string, error: string) => {
    return this.taskForm.controls[control].hasError(error);
  }

  submitForm() {
    console.log(this.taskForm.value);
    this.taskService.addTask(this.taskForm.value).subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close();
    }, (error: any) => {
      console.log(error);
    })
  }
}
