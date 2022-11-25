import { Button, Header, ListItem, Skeleton, Text } from '@rneui/themed';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { API_URL, API_KEY, API_ID } from '@env';
import axios from 'axios';
import { nutrientNames, nutrientsUnits } from '../tools/nutrients';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';

const Details = ({ route, navigation }) => {
  // const route = { params: { upc: '0047495710052' } };
  const [food, setFood] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

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
      console.log('err', err);
      setError(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getFoodDetails();
  }, []);

  const nuts = food?.hints[0].food.nutrients;
  const nutrientFacts = [];
  if (nuts) {
    for (const n in nuts) {
      if (nutrientNames[n]) {
        nutrientFacts.push({
          nutrientName: nutrientNames[n],
          unit: nuts[n],
          unitType: nutrientsUnits[n],
        });
      }
    }
  }
  const knownAs = food?.hints[0].food.knownAs;
  const label = food?.hints[0].food.label;
  const contents = food?.hints[0].food.foodContentsLabel;
  // console.log('knownAs', food?.hints[0].food.knownAs);
  // console.log('label', food?.hints[0].food.label);

  //
  if (error?.response.status === 404) {
    return (
      <View>
        <Header
          centerComponent={{ text: 'Not Found', style: styles.heading }}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.errorText}>
            Sorry, we couldn't find any information about this product.
          </Text>
        </View>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
  return (
    <View>
      <Header
        backgroundColor="#FF5C4D"
        centerComponent={{ text: knownAs, style: styles.heading }}
      ></Header>
      {nutrientFacts.map((n, i) => (
        <ListItem key={i} bottomDivider>
          <ListItem.Content>
            {<ListItem.Title>{n.nutrientName}</ListItem.Title> || (
              <Skeleton width={120} height={40} />
            )}
          </ListItem.Content>
          <ListItem.Content right>
            {(
              <ListItem.Title>
                {Math.round(n.unit) + ' ' + n.unitType}
              </ListItem.Title>
            ) || <Skeleton width={120} height={40} />}
          </ListItem.Content>
        </ListItem>
      ))}
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title>Ingredients</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Subtitle>{contents}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
      <Button
        buttonStyle={{
          backgroundColor: '#FF5C4D',
          borderRadius: 5,
        }}
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default Details;
