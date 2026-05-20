import { StatusBar } from 'expo-status-bar';
import TaskApp from './src/components/TaskApp';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <TaskApp />
    </>
  );
}
