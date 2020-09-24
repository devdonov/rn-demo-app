import React from 'react'
import { Animated, Image, StyleSheet, View } from 'react-native'
import { Text } from '../../components/Themed';
import layout from "../../constants/Layout";
import { Poster } from '../../data/posters';

const { width } = layout.window;

interface Props {
  poster: Poster
  index: number
  animatedX: Animated.Value
}

const ITEM_WIDTH = width * 0.7
const ITEM_HEIGHT = ITEM_WIDTH * 1.7
const VISIBLE_ITEM = 2

const PosterItem = ({ poster, index, animatedX }: Props) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = animatedX.interpolate({
    inputRange,
    outputRange: [50, 0, -100]
  });
  const scale = animatedX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 1.3]
  });
  const opacity = animatedX.interpolate({
    inputRange,
    outputRange: [1 - 1/VISIBLE_ITEM, 1, 0]
  });
  return (
    <Animated.View style={[styles.imageContainer, { opacity, transform: [{ translateX }, { scale }] }]}>
      <Image source={{ uri: poster.url }} style={ styles.image } />
      <Text style={{position: "absolute", top: 0, left: 0}}>{index}</Text>
    </Animated.View>
  )
}

export default PosterItem

const styles = StyleSheet.create({
  imageContainer: { position: "absolute", left: -ITEM_WIDTH / 2 },
  image: { width: ITEM_WIDTH, height: ITEM_HEIGHT }
})
