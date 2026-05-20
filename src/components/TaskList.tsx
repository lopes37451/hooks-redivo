import { FlatList, StyleSheet, View } from 'react-native';
import type { Task } from '../types';
import ListEmpty from './ListEmpty';
import TaskItem from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskList({ tasks, onToggle, onEdit, onDelete }: TaskListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        )}
        ListEmptyComponent={
          <ListEmpty
            title="Nenhuma tarefa encontrada"
            description="Adicione a primeira tarefa para começar."
          />
        }
        contentContainerStyle={tasks.length === 0 ? styles.emptyContent : styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 12,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 24,
  },
});
