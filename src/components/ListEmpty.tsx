import { StyleSheet, Text, View } from 'react-native';

type ListEmptyProps = {
  title?: string;
  description?: string;
};

export default function ListEmpty({
  title = 'Nenhuma tarefa por enquanto',
  description = 'Adicione algo novo para começar a organizar sua lista.',
}: ListEmptyProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  description: {
    marginTop: 6,
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});
