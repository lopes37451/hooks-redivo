import { StyleSheet, Text, View } from 'react-native';

export default function TaskFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feito para organizar a rotina.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  text: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});
