import { StyleSheet, Text, View } from 'react-native';

type TaskHeaderProps = {
  title?: string;
  subtitle?: string;
};

export default function TaskHeader({
  title = 'Minhas tarefas',
  subtitle = 'Um jeito simples de acompanhar o que precisa ser feito.',
}: TaskHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
