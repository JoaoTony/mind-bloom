import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, Button, StyleSheet, TextStyle } from 'react-native';

export const ShakingText = ({ text, style }: { text: string, style: TextStyle}) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Inicia a animação sempre que o texto muda
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [text]);

  const shake = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-5, 5], // intensidade da chacoalhada
  });

  return (
    <Animated.Text style={[style, { transform: [{ translateX: shake }] }]}>
      {text}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  shakeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
