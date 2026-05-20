import { useCallback, useEffect, useReducer } from 'react';
import {
  createTaskRequest,
  deleteTaskRequest,
  fetchAllTasks,
  toggleTaskRequest,
  updateTaskRequest,
} from '../services/taskApi';
import { MESSAGES } from '../utils/constants';
import type { Task, TaskFormData, UseTasksReturn } from '../types';

type State = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
};

type Action =
  | { type: 'loading'; payload: boolean }
  | { type: 'error'; payload: string | null }
  | { type: 'submitting'; payload: boolean }
  | { type: 'set'; payload: Task[] }
  | { type: 'insert'; payload: Task }
  | { type: 'replace'; payload: Task }
  | { type: 'remove'; payload: number };

const initialState: State = {
  tasks: [],
  loading: false,
  error: null,
  submitting: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: action.payload };
    case 'error':
      return { ...state, error: action.payload };
    case 'submitting':
      return { ...state, submitting: action.payload };
    case 'set':
      return { ...state, tasks: action.payload };
    case 'insert':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'replace':
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
      };
    case 'remove':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    default:
      return state;
  }
}

function isTitleValid(value: string): boolean {
  return value.trim().length > 0;
}

function errorText(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

async function runMutation<T>(config: {
  form: TaskFormData;
  fallback: string;
  setSubmitting: (value: boolean) => void;
  setError: (value: string | null) => void;
  request: () => Promise<T>;
  onSuccess: (value: T) => void;
}): Promise<boolean> {
  const { form, fallback, setSubmitting, setError, request, onSuccess } = config;

  if (!isTitleValid(form.title)) {
    setError(MESSAGES.ERROR_EMPTY_TITLE);
    return false;
  }

  setSubmitting(true);
  setError(null);

  try {
    const response = await request();
    onSuccess(response);
    return true;
  } catch (error) {
    setError(errorText(error, fallback));
    console.error('Erro:', error);
    return false;
  } finally {
    setSubmitting(false);
  }
}

export function useTasks(): UseTasksReturn {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchTasks = useCallback(async (): Promise<void> => {
    dispatch({ type: 'loading', payload: true });
    dispatch({ type: 'error', payload: null });

    try {
      const list = await fetchAllTasks();
      dispatch({ type: 'set', payload: list });
    } catch (error) {
      dispatch({ type: 'error', payload: errorText(error, MESSAGES.ERROR_LOAD) });
      console.error('Erro:', error);
    } finally {
      dispatch({ type: 'loading', payload: false });
    }
  }, []);

  const createTask = useCallback(
    async (form: TaskFormData): Promise<boolean> =>
      runMutation({
        form,
        fallback: MESSAGES.ERROR_CREATE,
        setSubmitting: (value) => dispatch({ type: 'submitting', payload: value }),
        setError: (value) => dispatch({ type: 'error', payload: value }),
        request: () => createTaskRequest(form),
        onSuccess: (task) => dispatch({ type: 'insert', payload: task }),
      }),
    [],
  );

  const updateTask = useCallback(
    async (id: number, form: TaskFormData): Promise<boolean> =>
      runMutation({
        form,
        fallback: MESSAGES.ERROR_UPDATE,
        setSubmitting: (value) => dispatch({ type: 'submitting', payload: value }),
        setError: (value) => dispatch({ type: 'error', payload: value }),
        request: () => updateTaskRequest(id, form),
        onSuccess: (task) => dispatch({ type: 'replace', payload: task }),
      }),
    [],
  );

  const toggleTask = useCallback(async (id: number): Promise<void> => {
    const snapshot = state.tasks;
    dispatch({ type: 'error', payload: null });
    dispatch({
      type: 'set',
      payload: snapshot.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    });

    try {
      const updated = await toggleTaskRequest(id);
      dispatch({ type: 'replace', payload: updated });
    } catch (error) {
      dispatch({ type: 'set', payload: snapshot });
      dispatch({ type: 'error', payload: errorText(error, MESSAGES.ERROR_UPDATE) });
      console.error('Erro:', error);
    }
  }, [state.tasks]);

  const deleteTask = useCallback(async (id: number): Promise<void> => {
    const snapshot = state.tasks;
    dispatch({ type: 'error', payload: null });
    dispatch({ type: 'remove', payload: id });

    try {
      await deleteTaskRequest(id);
    } catch (error) {
      dispatch({ type: 'set', payload: snapshot });
      dispatch({ type: 'error', payload: errorText(error, MESSAGES.ERROR_DELETE) });
      console.error('Erro:', error);
    }
  }, [state.tasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    submitting: state.submitting,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    fetchTasks,
  };
}
