import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { Slide } from '../../data/slides'
import layout from "../../constants/Layout";

const { width } = layout.window;

interface Props {
  data: Slide[],
  scrollX: Animated.Value
}

const C_SIZE = width * 0.8

const CircleSlider = ({ data, scrollX }: Props) => {

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]} pointerEvents="none">
        {data.map((i, index) => {
          const inputRange = [ (index - 0.55) * width, index * width, (index + 0.55) * width ];
          const inputRangeTranslate = [ (index - 0.75) * width, index * width, (index + 0.6) * width ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [ 0, 1, 0 ],
            extrapolate: "clamp"
          });
          const translateY = scrollX.interpolate({
            inputRange: inputRangeTranslate,
            outputRange: [ 60, 0, -100 ],
            extrapolate: "clamp"
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [ 0, 0.5, 0 ],
          });
          return <Animated.View
            key={i.key}
            style={[styles.circle, { backgroundColor: i.color, opacity, transform: [{ translateY }, { scale }] }]}
          />
        })}
    </View>
  )
}

export default CircleSlider

const styles = StyleSheet.create({
  circleContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    position: "absolute",
    width: C_SIZE,
    height: C_SIZE,
    borderRadius: C_SIZE / 2
  }
})
