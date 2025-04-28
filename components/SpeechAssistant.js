import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

const SpeechAssistant = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (text) {
      setIsSpeaking(true);
      Speech.speak(text, {
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
    }
  };

  const stop = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Type what you want to say..."
        multiline
      />
      <View style={styles.buttonContainer}>
        {!isSpeaking ? (
          <Button title="Speak" onPress={speak} />
        ) : (
          <Button title="Stop" onPress={stop} color="red" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default SpeechAssistant;