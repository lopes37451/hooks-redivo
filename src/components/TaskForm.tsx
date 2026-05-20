import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { TaskFormData } from '../types';

type TaskFormProps = {
  data: TaskFormData;
  onChange: (field: keyof TaskFormData, value: string) => void;
  onSubmit: () => void;
  submitting?: boolean;
  editing?: boolean;
};

export default function TaskForm({
  data,
  onChange,
  onSubmit,
  submitting = false,
  editing = false,
}: TaskFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        value={data.title}
        onChangeText={(value) => onChange('title', value)}
        placeholder="Digite o nome da tarefa"
        style={styles.input}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={data.description}
        onChangeText={(value) => onChange('description', value)}
        placeholder="Uma observação opcional"
        style={[styles.input, styles.multiline]}
        multiline
      />

      <Pressable
        onPress={onSubmit}
        disabled={submitting}
        style={({ pressed }) => [
          styles.button,
          editing ? styles.buttonEdit : styles.buttonCreate,
          pressed && styles.buttonPressed,
          submitting && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>
          {submitting ? 'Salvando...' : editing ? 'Salvar edição' : 'Adicionar tarefa'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#ffffff',
    marginBottom: 12,
  },
  multiline: {
    minHeight: 92,
    textAlignVertical: 'top',
  },
  button: {
    minHeight: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCreate: {
    backgroundColor: '#2563eb',
  },
  buttonEdit: {
    backgroundColor: '#0f766e',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
