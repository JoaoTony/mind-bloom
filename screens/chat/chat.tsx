import React, { useEffect, useRef } from 'react';
import {
  Animated,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { chatStyles as styles } from './chat.styles';

const ChatScreen = ({ messages = [], userId }: any) => {
  const animatedValuesRef = useRef<{ [key: number]: Animated.Value }>({});

  useEffect(() => {
    messages.forEach((msg, index) => {
      if (!animatedValuesRef.current[index]) {
        const isOwnMessage = msg.owner === userId;

        animatedValuesRef.current[index] = new Animated.Value(0);

        Animated.timing(animatedValuesRef.current[index], {
          toValue: 1,
          duration: isOwnMessage ? 500 : 300,
          useNativeDriver: true,
        }).start();
      }
    });
  }, [messages]);

  const renderItem = ({ item, index }) => {
    const isOwnMessage = item.owner === userId;
    const animatedValue = animatedValuesRef.current[index] || new Animated.Value(1);

    const scale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.95, 1],
    });

    return (
      <Animated.View
        style={[
          {
            opacity: animatedValue,
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
              { scale },
            ],
          },
          styles.messageContainer,
          isOwnMessage ? styles.messageRight : styles.messageLeft,
        ]}
      >
        <View
          style={[
            styles.messageCard,
            isOwnMessage ? styles.ownCard : styles.otherCard,
          ]}
        >
          <Text style={[styles[isOwnMessage ? 'messageText': 'leftMessageText']]}>{item.message}</Text>
          <Text style={[styles.dateText, { textAlign: isOwnMessage ? 'right' : 'left' }]}>{item.date}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={messages}
      renderItem={renderItem}
      inverted
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ChatScreen;
