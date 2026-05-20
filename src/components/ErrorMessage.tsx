import { Text, View, StyleSheet } from 'react-native';

type ErrorMessageProps = {
  message?: string | null;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
  },
  text: {
    color: '#b91c1c',
    fontSize: 14,
    lineHeight: 20,
  },
});
