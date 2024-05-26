import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastService } from '../../../services/toast/toast.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';

interface Task {
  _id?: string;
  title: string;
  description?: string;
  completed?: boolean;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgxSpinnerModule, MatExpansionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks: Task[] = [
  ];
  newTask: Task = { title: '', description: '', completed: false };
  panelOpenState: boolean = false;
  isEditMode: boolean = false;
  taskToEdit: Task | null = null;
  constructor(private taskService: TaskService,
    private spinner: NgxSpinnerService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    if (typeof window !== 'undefined') {
      this.spinner.show()
      const token = localStorage.getItem('token');
      if (token) {
        this.taskService.getTasks().subscribe(tasks => {
          this.tasks = tasks
          this.spinner.hide()
          console.log(this.tasks);
        });

      }
    }
  }

  addTask(): void {
    if (this.newTask.title) {
      this.spinner.show()
      this.taskService.addTask(this.newTask).subscribe(task => {
        this.newTask = { title: '', description: '' };
        this.spinner.hide()
        this.toastService.showSuccess('Task added successfully', 'Success');
        this.loadTasks()
      });
    }
  }

  updateTask(): void {
    if (this.taskToEdit) {
      this.spinner.show();
      this.taskService.updateTask(this.newTask).subscribe(() => {
        this.toastService.showSuccess('Task updated successfully', 'Success');
        this.resetEditMode()
        this.spinner.hide();
        this.loadTasks();
      });
    }
  }
  updateTaskStatus(task: Task, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    task.completed = checkbox.checked;
    this.taskService.updateTask(task).subscribe(() => {
      this.toastService.showSuccess('Task updated successfully', 'Success');
      this.loadTasks();
      this.resetEditMode();
    });
  }

  deleteTask(task: Task): void {
    this.spinner.show()
    this.taskService.deleteTask(task._id).subscribe(() => {
      this.toastService.showSuccess('Task deleted successfully', 'Success');
      this.spinner.show()
      this.loadTasks();
      this.resetEditMode();
    });
  }

  editTask(task: Task): void {
    this.newTask = { ...task };
    this.taskToEdit = task;
    this.isEditMode = true;
  }

  resetEditMode(): void {
    this.newTask = { title: '', description: '', completed: false };
    this.taskToEdit = null;
    this.isEditMode = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
