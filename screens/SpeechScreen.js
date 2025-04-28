import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors';

const SpeechScreen = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Speech Assistant</Text>
        <Text style={styles.subtitle}>Type or speak your message</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Type your message here..."
          placeholderTextColor={Colors.lightGray}
          multiline
          textAlignVertical="top"
        />
        <View style={styles.buttonRow}>
          <CustomButton 
            title={isSpeaking ? "Stop" : "Speak"} 
            onPress={() => setIsSpeaking(!isSpeaking)}
            style={{ flex: 1, backgroundColor: isSpeaking ? Colors.error : Colors.primary }}
          />
          <CustomButton 
            title="Translate" 
            onPress={() => console.log("Translate")}
            style={{ flex: 1, marginLeft: 10, backgroundColor: Colors.secondary }}
          />
        </View>
      </View>

      <View style={styles.suggestionsContainer}>
        <Text style={styles.sectionTitle}>Quick Phrases</Text>
        <View style={styles.suggestionsRow}>
          <CustomButton 
            title="Hello" 
            onPress={() => setText("Hello")}
            style={styles.suggestionButton}
            textStyle={styles.suggestionText}
          />
          <CustomButton 
            title="Thank you" 
            onPress={() => setText("Thank you")}
            style={styles.suggestionButton}
            textStyle={styles.suggestionText}
          />
          <CustomButton 
            title="Help" 
            onPress={() => setText("I need help")}
            style={styles.suggestionButton}
            textStyle={styles.suggestionText}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 5,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  suggestionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 10,
  },
  suggestionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  suggestionButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  suggestionText: {
    color: Colors.primary,
    fontSize: 14,
  },
});

export default SpeechScreen;