import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Gongo</Text>
        <Text style={styles.subtitle}>Every voice deserves to be heard</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <CustomButton 
          title="Start Speaking" 
          onPress={() => navigation.navigate('Speech')}
          style={{ backgroundColor: Colors.secondary }}
        />
        <CustomButton 
          title="Speech Exercises" 
          onPress={() => navigation.navigate('Exercises')}
          style={{ marginTop: 15, backgroundColor: Colors.primary }}
        />
        <CustomButton 
          title="Community" 
          onPress={() => navigation.navigate('Community')}
          style={{ marginTop: 15, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.primary }}
          textStyle={{ color: Colors.primary }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 40,
  },
});

export default HomeScreen;