import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastService } from '../../../services/toast/toast.service';



interface Task {
  _id?: string;
  title: string;
  description?: string;
  completed?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks: Task[] = [
  ];
  newTask: Task = { title: '', description: '', completed: false };

  constructor(private taskService: TaskService,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
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

  updateTask(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe((data: any) => {
      this.toastService.showSuccess('Task updated successfully', 'Success');
      this.loadTasks()
    });
  }

  deleteTask(task: Task): void {
    this.spinner.show()
    this.taskService.deleteTask(task._id).subscribe(() => {
      this.spinner.show()
      this.toastService.showSuccess('Task deleted successfully', 'Success');
      this.loadTasks();
    });
  }
}
