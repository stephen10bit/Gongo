import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors';

const ExercisesScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('articulation');
  const [currentExercise, setCurrentExercise] = useState(null);
  const [recording, setRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Animation values for the waveform
  const waveAnimations = Array(5).fill().map(() => new Animated.Value(1));

  // Sample exercise data
  const exerciseCategories = {
    articulation: [
      { id: 1, title: 'P Sound Practice', description: 'Repeat after the prompts', level: 'Beginner' },
      { id: 2, title: 'Tongue Twisters', description: 'Challenge your articulation', level: 'Intermediate' },
    ],
    fluency: [
      { id: 3, title: 'Slow Speech', description: 'Practice controlled speech', level: 'Beginner' },
      { id: 4, title: 'Conversation Practice', description: 'Simulated dialogues', level: 'Advanced' },
    ],
    breathing: [
      { id: 5, title: 'Diaphragmatic Breathing', description: 'Foundation for speech', level: 'Beginner' },
    ],
  };

  // Animate waveform when recording
  useEffect(() => {
    if (recording) {
      const animateWave = () => {
        waveAnimations.forEach((anim, index) => {
          Animated.loop(
            Animated.sequence([
              Animated.timing(anim, {
                toValue: Math.random() * 3 + 1,
                duration: 200 + Math.random() * 300,
                useNativeDriver: true,
              }),
              Animated.timing(anim, {
                toValue: 1,
                duration: 200 + Math.random() * 300,
                useNativeDriver: true,
              }),
            ])
          ).start();
        });
      };
      animateWave();
    } else {
      waveAnimations.forEach(anim => anim.stopAnimation());
    }
  }, [recording]);

  const startExercise = (exercise) => {
    setCurrentExercise(exercise);
    setProgress(0);
  };

  const handleRecording = () => {
    setRecording(!recording);
    // Simulate progress for demo
    if (!recording) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setRecording(false);
            return 100;
          }
          return prev + 2;
        });
      }, 200);
    }
  };

  return (
    <View style={styles.container}>
      {!currentExercise ? (
        <>
          <Text style={styles.title}>Speech Exercises</Text>
          <Text style={styles.subtitle}>Choose a category to begin</Text>
          
          <View style={styles.categoryContainer}>
            <CustomButton 
              title="Voicing" 
              onPress={() => setActiveCategory('articulation')}
              style={[
                styles.categoryButton,
                activeCategory === 'articulation' && styles.activeCategory
              ]}
            />
            <CustomButton 
              title="Fluency" 
              onPress={() => setActiveCategory('fluency')}
              style={[
                styles.categoryButton,
                activeCategory === 'fluency' && styles.activeCategory
              ]}
            />
            <CustomButton 
              title="Respire" 
              onPress={() => setActiveCategory('breathing')}
              style={[
                styles.categoryButton,
                activeCategory === 'breathing' && styles.activeCategory
              ]}
            />
          </View>

          <ScrollView style={styles.exerciseList}>
            {exerciseCategories[activeCategory].map(exercise => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                  <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                  <Text style={styles.exerciseLevel}>{exercise.level}</Text>
                </View>
                <CustomButton 
                  title="Start" 
                  onPress={() => startExercise(exercise)}
                  style={styles.startButton}
                />
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <View style={styles.exerciseSession}>
          <Text style={styles.sessionTitle}>{currentExercise.title}</Text>
          
          <View style={styles.instructionBox}>
            <Text style={styles.instructionText}>
              {currentExercise.id === 1 
                ? "Repeat after me: 'Peter Piper picked a peck of pickled peppers'"
                : currentExercise.id === 2
                ? "Say this quickly: 'She sells seashells by the seashore'"
                : "Take a deep breath and speak slowly"}
            </Text>
          </View>

          <View style={styles.visualFeedback}>
            <View style={styles.waveformContainer}>
              {waveAnimations.map((anim, index) => (
                <Animated.View 
                  key={index}
                  style={[
                    styles.waveformBar,
                    { 
                      transform: [{ scaleY: anim }],
                      backgroundColor: recording ? Colors.secondary : Colors.lightGray,
                    }
                  ]}
                />
              ))}
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}% complete</Text>
          </View>

          <CustomButton 
            title={recording ? "Stop Recording" : "Start Recording"} 
            onPress={handleRecording}
            style={[
              styles.recordButton,
              recording && styles.recordingActive
            ]}
            textStyle={recording ? { color: Colors.white } : {}}
          />

          <CustomButton 
            title="Back to Exercises" 
            onPress={() => setCurrentExercise(null)}
            style={styles.backButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: Colors.blue,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  activeCategory: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  exerciseList: {
    flex: 1,
  },
  exerciseCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 5,
  },
  exerciseLevel: {
    fontSize: 12,
    color: Colors.secondary,
  },
  startButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  exerciseSession: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionBox: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  visualFeedback: {
    alignItems: 'center',
    marginBottom: 30,
  },
  waveformContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
    marginBottom: 20,
  },
  waveformBar: {
    width: 8,
    height: 30,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
  },
  progressText: {
    fontSize: 14,
    color: Colors.text,
  },
  recordButton: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingVertical: 15,
    marginBottom: 15,
  },
  recordingActive: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  backButton: {
    backgroundColor: Colors.lightGray,
  },
});

export default ExercisesScreen;