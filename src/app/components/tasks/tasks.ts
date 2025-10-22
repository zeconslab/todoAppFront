import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task';
import { TaskInterface } from '../../models/task';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {
  tasks: TaskInterface[] = [];
  task: TaskInterface = {
    title: '',
    description: '',
    completed: false
  }
  isLoading: boolean = false;
  editingTask: TaskInterface | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private taskService: TaskService, private authService: Auth, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.clearMessages();
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log('Tasks loaded:', tasks);
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.errorMessage = 'Error al cargar las tareas. Verifica tu autenticación.';
      }
    });
  }

  addTask() {
    if (!this.task.title.trim()) {
      this.errorMessage = 'El título de la tarea es requerido';
      return;
    }

    if (!this.task.description.trim()) {
      this.errorMessage = 'La descripción de la tarea es requerida';
      return;
    }

    this.isLoading = true;
    this.clearMessages();
    
    this.taskService.addTask(this.task).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask);
        this.task = { title: '', description: '', completed: false };
        this.successMessage = '¡Tarea agregada exitosamente!';
        this.clearMessagesAfterDelay();
      },
      error: (error) => {
        console.error('Error adding task:', error);
        this.errorMessage = 'Error al agregar la tarea';
      },
      complete: () => this.isLoading = false
    });
  }

  toggleTaskCompletion(task: TaskInterface) {
    const updatedTask = { ...task, completed: !task.completed };
    
    this.taskService.updateTask(updatedTask).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = updated;
        }
        this.successMessage = `Tarea ${updated.completed ? 'completada' : 'marcada como pendiente'}`;
        this.clearMessagesAfterDelay();
      },
      error: (error) => {
        console.error('Error updating task:', error);
        this.errorMessage = 'Error al actualizar la tarea';
      }
    });
  }

  startEditTask(task: TaskInterface) {
    this.editingTask = { ...task };
  }

  saveTaskEdit() {
    if (!this.editingTask || !this.editingTask.title.trim()) {
      this.errorMessage = 'El título de la tarea es requerido';
      return;
    }

    if (!this.editingTask.description.trim()) {
      this.errorMessage = 'La descripción de la tarea es requerida';
      return;
    }

    this.taskService.updateTask(this.editingTask).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex(t => t.id === this.editingTask!.id);
        if (index !== -1) {
          this.tasks[index] = updated;
        }
        this.editingTask = null;
        this.successMessage = 'Tarea actualizada exitosamente';
        this.clearMessagesAfterDelay();
      },
      error: (error) => {
        console.error('Error updating task:', error);
        this.errorMessage = 'Error al actualizar la tarea';
      }
    });
  }

  cancelEdit() {
    this.editingTask = null;
  }

  deleteTask(taskId: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== taskId);
          this.successMessage = 'Tarea eliminada exitosamente';
          this.clearMessagesAfterDelay();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.errorMessage = 'Error al eliminar la tarea';
        }
      });
    }
  }

  private clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  private clearMessagesAfterDelay() {
    setTimeout(() => {
      this.clearMessages();
    }, 3000);
  }

  get pendingTasks(): TaskInterface[] {
    return this.tasks.filter(task => !task.completed);
  }

  get completedTasks(): TaskInterface[] {
    return this.tasks.filter(task => task.completed);
  }

  logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
