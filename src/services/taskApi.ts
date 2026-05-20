import type { Task, TaskFormData } from '../types';

const WAIT_MS = 320;

let tasksData: Task[] = [
  {
    id: 1,
    title: 'Separar os cadernos',
    description: 'Deixar tudo pronto para a aula.',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Ler o resumo',
    description: 'Ver se o texto final está claro.',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Abrir o app no celular',
    description: 'Conferir se o mock local aparece certo.',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function clone(task: Task): Task {
  return { ...task };
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function nextId(): number {
  return tasksData.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

async function wrap<T>(handler: () => T): Promise<T> {
  await wait(WAIT_MS);
  return handler();
}

export async function fetchAllTasks(): Promise<Task[]> {
  return wrap(() => tasksData.map(clone));
}

export async function createTaskRequest(taskData: TaskFormData): Promise<Task> {
  return wrap(() => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: nextId(),
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    tasksData = [...tasksData, newTask];
    return clone(newTask);
  });
}

export async function updateTaskRequest(id: number, taskData: TaskFormData): Promise<Task> {
  return wrap(() => {
    const current = tasksData.find((task) => task.id === id);

    if (!current) {
      throw new Error('Tarefa não encontrada.');
    }

    const updatedTask: Task = {
      ...current,
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      updatedAt: new Date().toISOString(),
    };

    tasksData = tasksData.map((task) => (task.id === id ? updatedTask : task));
    return clone(updatedTask);
  });
}

export async function toggleTaskRequest(id: number): Promise<Task> {
  return wrap(() => {
    const current = tasksData.find((task) => task.id === id);

    if (!current) {
      throw new Error('Tarefa não encontrada.');
    }

    const toggledTask: Task = {
      ...current,
      completed: !current.completed,
      updatedAt: new Date().toISOString(),
    };

    tasksData = tasksData.map((task) => (task.id === id ? toggledTask : task));
    return clone(toggledTask);
  });
}

export async function deleteTaskRequest(id: number): Promise<void> {
  await wrap(() => {
    tasksData = tasksData.filter((task) => task.id !== id);
  });
}
