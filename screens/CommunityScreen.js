import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors';

const CommunityScreen = () => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      user: 'Kwame',
      avatar: '👨🏾',
      content: 'Just completed my first week of speech exercises! Feeling more confident already.',
      likes: 12,
      comments: 4,
      time: '2h ago',
      isLiked: false
    },
    {
      id: '2',
      user: 'Ama',
      avatar: '👩🏾',
      content: 'Does anyone have tips for practicing the "r" sound? I struggle with this one.',
      likes: 8,
      comments: 7,
      time: '5h ago',
      isLiked: true
    },
    {
      id: '3',
      user: 'SpeechTherapist',
      avatar: '👨🏼⚕️',
      content: 'Professional therapist here. Remember to practice in short sessions (15-20 mins) but consistently every day!',
      likes: 25,
      comments: 3,
      time: '1d ago',
      isLiked: false
    }
  ]);
  const [newPost, setNewPost] = useState('');

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleAddPost = () => {
    if (newPost.trim() === '') return;
    
    const newPostObj = {
      id: Math.random().toString(),
      user: 'You',
      avatar: '🙂',
      content: newPost,
      likes: 0,
      comments: 0,
      time: 'Just now',
      isLiked: false
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        <View>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postFooter}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          <Text style={[styles.actionText, item.isLiked && styles.likedText]}>
            {item.isLiked ? '❤️' : '🤍'} {item.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 {item.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Support</Text>
      <Text style={styles.subtitle}>Connect with others on similar journeys</Text>
      
      <View style={styles.createPostContainer}>
        <TextInput
          style={styles.postInput}
          placeholder="Share your thoughts or ask a question..."
          placeholderTextColor={Colors.lightGray}
          multiline
          value={newPost}
          onChangeText={setNewPost}
        />
        <CustomButton
          title="Post"
          onPress={handleAddPost}
          style={styles.postButton}
          disabled={newPost.trim() === ''}
        />
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.postsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
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
  createPostContainer: {
    marginBottom: 20,
  },
  postInput: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    minHeight: 60,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginBottom: 10,
  },
  postButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 25,
  },
  postsList: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    fontSize: 24,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    color: Colors.text,
  },
  postTime: {
    fontSize: 12,
    color: Colors.lightGray,
  },
  postContent: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 15,
    lineHeight: 22,
  },
  postFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    paddingTop: 10,
  },
  actionButton: {
    marginRight: 20,
  },
  actionText: {
    fontSize: 14,
    color: Colors.text,
  },
  likedText: {
    color: Colors.error,
  },
});

export default CommunityScreen;