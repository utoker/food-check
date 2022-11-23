import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './tools/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
