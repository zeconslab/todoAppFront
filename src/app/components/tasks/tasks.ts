import { Component, OnInit } from '@angular/core';
import { Task } from '../../services/task';
import { TaskInterface } from '../../models/task';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {
  tasks: TaskInterface[] = [];
  task: TaskInterface = {
    id: 0,
    title: '',
    description: '',
    completed: false
  }
  constructor(private taskService: Task) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      }
    });
  }

  addTask() {
    this.taskService.addTask(this.task).subscribe();
  }

  updateTask(task: TaskInterface) {
    this.taskService.updateTask(task).subscribe();
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
    });
  }
}
