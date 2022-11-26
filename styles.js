import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#FF5C4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 160,
    aspectRatio: 1,
  },
  container: {
    // backgroundColor: '#FF5C4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    paddingVertical: 10,
    backgroundColor: '#FF5C4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 10,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    marginVertical: 10,
    fontSize: 20,
  },
  scannerBox: {
    // flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#FF5C4D',
  },
  scanner: {
    height: 600,
    width: 600,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF5C4D',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default styles;
