import { Button, Header, Image, ListItem, Skeleton, Text } from '@rneui/themed';
import { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { API_URL, API_KEY, API_ID } from '@env';
import axios from 'axios';
import { nutrientNames, nutrientsUnits } from '../tools/nutrients';
import styles from '../styles';
import NutrientList from '../components/NutrientList';

const Details = ({ route, navigation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [nutrients, setNutrients] = useState([]);

  const getFoodDetails = async () => {
    const upc = route.params.upc;

    try {
      const { data } = await axios.get(API_URL, {
        params: {
          app_id: API_ID,
          app_key: API_KEY,
          upc: upc,
        },
      });
      setImageUri(data.hints[0].food.image);
      setLabel(data.hints[0].food.label);
      setIngredients(data.hints[0].food.foodContentsLabel);
      const nutritionFacts = [];
      for (const n in data.hints[0].food.nutrients) {
        if (nutrientNames[n]) {
          nutritionFacts.push({
            nutrientName: nutrientNames[n],
            unit: data.hints[0].food.nutrients[n],
            unitType: nutrientsUnits[n],
          });
        }
      }
      setNutrients(nutritionFacts);

      setLoading(false);
    } catch (err) {
      console.log('err', err);
      setError(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getFoodDetails();
    }, 1111);
  }, []);

  if (error?.response?.status === 404) {
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
    <ScrollView>
      <Header
        backgroundColor="#FF5C4D"
        centerComponent={{ text: 'Nutrition Facts', style: styles.heading }}
      ></Header>
      <NutrientList
        loading={loading}
        imageUri={imageUri}
        label={label}
        nutrients={nutrients}
        ingredients={ingredients}
      />
      <Button
        buttonStyle={{
          backgroundColor: '#FF5C4D',
          borderRadius: 5,
        }}
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
  );
};

export default Details;
