import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from '../screens/Details';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Product Details" component={Details} />
    </Stack.Navigator>
  );
};
export default StackNavigator;
