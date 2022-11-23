import { Button, Header, ListItem, Text } from '@rneui/themed';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
// import { API_URL, API_KEY, API_ID } from '@env';
import axios from 'axios';
import { nutrientNames, nutrientsUnits } from '../tools/nutrients';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';

const API_URL = 'https://api.edamam.com/api/food-database/v2/parser';
const API_ID = '62cba52a';
const API_KEY = 'ddf6b6e9f3c881a59d53b4a41be7931f';

const Details = ({ route, navigation }) => {
  // const route = { params: { upc: '0047495710052' } };
  const [food, setFood] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getFoodDetails = async () => {
    const upc = route.params.upc;
    console.log(upc);

    try {
      const { data } = await axios.get(API_URL, {
        params: {
          app_id: API_ID,
          app_key: API_KEY,
          upc: upc,
        },
      });
      setFood(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
      throw error;
    }
  };
  useEffect(() => {
    getFoodDetails();
  }, []);

  const nuts = food?.hints[0].food.nutrients;
  const test = [];
  if (nuts) {
    for (const n in nuts) {
      if (nutrientNames[n]) {
        test.push({
          nutrientName: nutrientNames[n],
          unit: nuts[n],
          unitType: nutrientsUnits[n],
        });
      }
    }
  }
  const knownAs = food?.hints[0].food.knownAs;
  const label = food?.hints[0].food.label;
  // console.log('knownAs', food?.hints[0].food.knownAs);
  // console.log('label', food?.hints[0].food.label);

  return (
    <View>
      <Header
        centerComponent={{ text: knownAs, style: styles.heading }}
      ></Header>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        test.map((n, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{n.nutrientName}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title>
                {Math.round(n.unit) + ' ' + n.unitType}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      )}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Details;
