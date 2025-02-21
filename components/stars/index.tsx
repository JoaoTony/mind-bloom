import { FC } from "react";
import { View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import { starsStyles as styles } from './stars.styles'

const LIST_OF_STARTS = [1, 2, 3, 4, 5]

function isFloat(num: number) {
  return num % 1 !== 0;
}

const chooseTheName = (star: number, stars: number) => {
  const integerPart =  Math.trunc(stars)
  if(isFloat(stars) && star === integerPart + 1) {
    return "star-half-full"
  }

  if(star <= stars) {
    return "star"
  }

  return "star-o"
}

export const Stars: FC<{ stars: number }> = ({ stars }) => {

  return(
    <View style={styles.container}>
      {LIST_OF_STARTS.map(star => (
        <FontAwesome
          key={star}
          name={chooseTheName(star, stars)}
          size={16}
          color="#4b4f59"
        />
      ))}
    </View>
  )
}
