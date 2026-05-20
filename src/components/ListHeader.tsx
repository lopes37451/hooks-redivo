import { StyleSheet, Text, View } from 'react-native';

type ListHeaderProps = {
  title?: string;
};

export default function ListHeader({ title = 'Tarefas da semana' }: ListHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
});
