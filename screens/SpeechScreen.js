import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Animated,
  Platform,
  PermissionsAndroid,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import Colors from '../constants/Colors';

const SpeechScreen = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const decibelLevel = useRef(new Animated.Value(0)).current;
  const recording = useRef(null);

  // Request microphone permission for Android
  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'Gongo needs access to your microphone for speech recording.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recording.current) {
        recording.current.stopAndUnloadAsync();
      }
    };
  }, []);

  // Animation for microphone feedback
  useEffect(() => {
    let animation;
    if (isRecording) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(decibelLevel, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(decibelLevel, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    }
    return () => {
      if (animation) animation.stop();
    };
  }, [isRecording]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert('Permission required', 'Microphone access is needed for speech recognition');
        return;
      }

      // Set audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      // Start new recording
      console.log('Starting recording...');
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recording.current = newRecording;
      setIsRecording(true);
      
      console.log('Recording started successfully');

    } catch (error) {
      console.error('Recording error:', error);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      console.log('Stopping recording...');
      if (recording.current) {
        await recording.current.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        recording.current = null;
      }
      setIsRecording(false);
      console.log('Recording stopped successfully');
    } catch (error) {
      console.error('Stop recording error:', error);
      Alert.alert('Error', 'Failed to stop recording properly.');
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const speak = () => {
    if (text) {
      setIsSpeaking(true);
      Speech.speak(text, {
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Speech Assistant</Text>
        <Text style={styles.subtitle}>Practice your speech and get feedback</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Type or speak your message..."
          placeholderTextColor={Colors.lightGray}
          multiline
          textAlignVertical="top"
        />
        
        <View style={styles.microphoneContainer}>
          <TouchableOpacity
            onPress={toggleRecording}
            style={[styles.microphoneButton, isRecording && styles.recording]}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={isRecording ? 'mic-off' : 'mic'}
              size={28}
              color={isRecording ? Colors.error : Colors.primary}
            />
          </TouchableOpacity>
          
          {isRecording && (
            <View style={styles.recordingFeedback}>
              <Text style={styles.timerText}>{formatTime(timer)}</Text>
              <Animated.View 
                style={[
                  styles.soundWave,
                  {
                    opacity: decibelLevel.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1]
                    }),
                    transform: [{
                      scaleY: decibelLevel.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1.2]
                      })
                    }]
                  }
                ]} 
              />
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={speak}
        disabled={!text}
        style={[styles.speakButton, isSpeaking && styles.speakingButton]}
      >
        <Text style={styles.speakButtonText}>
          {isSpeaking ? "Stop Speaking" : "Speak Text"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ... (keep your existing styles) ...

export default SpeechScreen;