import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Task } from '../types';

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  return (
    <View style={styles.card}>
      <Pressable onPress={() => onToggle(task.id)} style={styles.content}>
        <View style={[styles.check, task.completed && styles.checkDone]}>
          <Text style={styles.checkMark}>{task.completed ? '✓' : ''}</Text>
        </View>

        <View style={styles.textBlock}>
          <Text style={[styles.title, task.completed && styles.titleDone]} numberOfLines={1}>
            {task.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {task.description || 'Sem descrição'}
          </Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable onPress={() => onEdit(task)} style={styles.actionButton}>
          <Text style={styles.actionText}>Editar</Text>
        </Pressable>
        <Pressable onPress={() => onDelete(task.id)} style={styles.actionButton}>
          <Text style={[styles.actionText, styles.deleteText]}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkDone: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
  },
  description: {
    marginTop: 3,
    fontSize: 13,
    color: '#6b7280',
  },
  actions: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
  },
  deleteText: {
    color: '#dc2626',
  },
});
