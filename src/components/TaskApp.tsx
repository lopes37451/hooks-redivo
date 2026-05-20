import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import ErrorMessage from './ErrorMessage';
import ListHeader from './ListHeader';
import TaskFooter from './TaskFooter';
import TaskForm from './TaskForm';
import TaskHeader from './TaskHeader';
import TaskList from './TaskList';
import { useTasks } from '../hooks/useTasks';
import type { Task, TaskFormData } from '../types';
import { useState } from 'react';

const INITIAL_FORM: TaskFormData = {
  title: '',
  description: '',
};

export default function TaskApp() {
  const { tasks, error, submitting, createTask, updateTask, toggleTask, deleteTask } = useTasks();
  const [form, setForm] = useState<TaskFormData>(INITIAL_FORM);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  function handleChange(field: keyof TaskFormData, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleEdit(task: Task) {
    setEditingTaskId(task.id);
    setForm({
      title: task.title,
      description: task.description ?? '',
    });
  }

  function resetForm() {
    setEditingTaskId(null);
    setForm(INITIAL_FORM);
  }

  async function handleSubmit() {
    const payload = {
      title: form.title,
      description: form.description,
    };

    const saved = editingTaskId
      ? await updateTask(editingTaskId, payload)
      : await createTask(payload);

    if (saved) {
      resetForm();
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TaskHeader />
          <ListHeader />
          <TaskForm
            data={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            editing={editingTaskId !== null}
          />
          <ErrorMessage message={error} />
          <TaskList tasks={tasks} onToggle={toggleTask} onEdit={handleEdit} onDelete={deleteTask} />
          <TaskFooter />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  page: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: 8,
    paddingBottom: 16,
  },
});
