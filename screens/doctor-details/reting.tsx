import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  onRatingChange?: (rating: number) => void;
  initialRating?: number;
};

const StarRating: React.FC<Props> = ({ onRatingChange, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);

  const handlePress = (value: number) => {
    setRating(value);
    if (onRatingChange) onRatingChange(value);
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((value) => (
        <TouchableOpacity key={value} onPress={() => handlePress(value)}>
          <FontAwesome
            name={value <= rating ? 'star' : 'star-o'}
            size={32}
            color="#FFD700"
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  star: {
    marginHorizontal: 4,
  },
});

export default StarRating;
