import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastService } from '../../../services/toast/toast.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

interface Task {
  _id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: string;
  priority?: TaskPriority
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgxSpinnerModule, MatExpansionModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks: Task[] = [
  ];
  newTask: Task = { title: '', description: '', completed: false, dueDate: '', priority: TaskPriority.Low };
  panelOpenState: boolean = false;
  isEditMode: boolean = false;
  taskToEdit: Task | null = null;
  isAddTaskExpanded: boolean = false;
  constructor(private taskService: TaskService,
    private spinner: NgxSpinnerService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    if (typeof window !== 'undefined') {
      this.showSpinner();
      const token = localStorage.getItem('token');
      if (token) {
        try {
          this.tasks = await firstValueFrom(this.taskService.getTasks());
        } catch (error) {
          console.error('Failed to load tasks', error);
        } finally {
          this.hideSpinner();
        }
      }
    }
  }

  async addTask(): Promise<void> {
    if (this.newTask.title) {
      this.showSpinner();
      try {
        await firstValueFrom(this.taskService.addTask(this.newTask));
        this.toastService.showSuccess('Task added successfully', 'Success');
        this.resetEditMode();
        this.loadTasks();
      } catch (error) {
        console.error('Failed to add task', error);
      } finally {
        this.hideSpinner();
      }
    }
  }

  async updateTask(): Promise<void> {
    if (this.taskToEdit) {
      this.showSpinner();
      try {
        await firstValueFrom(this.taskService.updateTask(this.newTask));
        this.toastService.showSuccess('Task updated successfully', 'Success');
        this.resetEditMode();
        this.loadTasks();
      } catch (error) {
        console.error('Failed to update task', error);
      } finally {
        this.hideSpinner();
      }
    }
  }

  async updateTaskStatus(task: Task, event: Event): Promise<void> {
    const checkbox = event.target as HTMLInputElement;
    task.completed = checkbox.checked;
    this.showSpinner();
    try {
      await firstValueFrom(this.taskService.updateTask(task));
      this.toastService.showSuccess('Task status updated successfully', 'Success');
      this.loadTasks();
    } catch (error) {
      console.error('Failed to update task status', error);
    } finally {
      this.hideSpinner();
    }
  }

  async deleteTask(task: Task): Promise<void> {
    this.showSpinner();
    try {
      await firstValueFrom(this.taskService.deleteTask(task._id!));
      this.toastService.showSuccess('Task deleted successfully', 'Success');
      this.loadTasks();
    } catch (error) {
      console.error('Failed to delete task', error);
    } finally {
      this.hideSpinner();
    }
  }


  editTask(task: Task): void {
    this.newTask = { ...task };
    this.taskToEdit = task;
    this.isEditMode = true;
  }

  resetEditMode(): void {
      this.newTask = this.getEmptyTask();
  }

  showHideAddTask() {
    this.isAddTaskExpanded = !this.isAddTaskExpanded
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  private showSpinner() {
    this.spinner.show();
  }

  private hideSpinner() {
    this.spinner.hide();
  }

  private getEmptyTask(): Task {
    return { title: '', description: '', completed: false, dueDate: '', priority: TaskPriority.Low };
  }

}
