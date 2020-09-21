import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { View, Text } from '../../components/Themed'
import { Slide } from '../../data/slides'
import layout from "../../constants/Layout";

const { width } = layout.window;

const T_HEIGHT = 40

interface Props {
  scrollX: Animated.Value;
  data: Slide[]
}

const Ticker = ({ scrollX, data }: Props) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [T_HEIGHT, 0, -T_HEIGHT]
  })

  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        { data.map((i, index) => {
          return <Text key={i.key} style={styles.tickerText}>{i.type}</Text>
        }) }
      </Animated.View>
    </View>
  )
}

export default Ticker

const styles = StyleSheet.create({
  tickerContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    overflow: "hidden",
    // backgroundColor: "#ccc",
    height: T_HEIGHT - 6
  },
  tickerText: {
    fontSize: T_HEIGHT,
    lineHeight: T_HEIGHT,
    textTransform: "uppercase",
    letterSpacing: 2
  }
})
