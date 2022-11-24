import { Button, Card, Divider, Header, Text } from '@rneui/themed';
import { View } from 'react-native';
import { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../styles';
import { useIsFocused } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const isFocused = useIsFocused(); // to refresh the screen when the user navigates back to it

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  //request permission to use the camera
  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  // when the user scans a barcode
  const handleBarCodeScanned = ({ data }) => {
    // navigate to the details screen
    navigation.navigate('Product Details', { upc: data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button
          onPress={getBarCodeScannerPermissions}
          title="grant permission"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'Food Checker', style: styles.heading }}
      ></Header>
      <View style={styles.container}>
        <Text style={styles.title}>Scan a barcode to get nutrient facts</Text>
        <View style={styles.scannerBox}>
          {isFocused && (
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={styles.scanner}
            />
          )}
        </View>
        <Text style={styles.title}>
          Search over 700,000 unique UPC codes in our database
        </Text>
      </View>
    </View>
  );
};

export default Home;
