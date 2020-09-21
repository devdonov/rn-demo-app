import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
// import { View } from '../../components/Themed'
import { Slide } from '../../data/slides';
import layout from "../../constants/Layout";

const { width, height } = layout.window;

const DOT_SIZE = 40;

interface Props {
  data: Slide[],
  scrollX: Animated.Value
}

const Pagination = ({data, scrollX}: Props) => {
  // const interpolateConf = data.reduce((config, item, index) => {
  //   config.inputRange.push(index * width)
  //   config.outputRange.push(item.color)
  //   return config;
  // }, {
  //   inputRange: [],
  //   outputRange: [],
  //   extrapolate: "clamp"
  // } as { inputRange: number[], outputRange: string[] });
  // const translateX = scrollX.interpolate({
  //   inputRange,
  //   outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  // });
  // const color = scrollX.interpolate(interpolateConf)
  return (
    <View style={styles.pagination}>
      
      {
        data.map((i, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-DOT_SIZE, 0, DOT_SIZE],
            extrapolate: "clamp"
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          // const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
          // const outputRange = [(data[index - 1] || data[0]).color, i.color, (data[index - 1] || data[data.length - 1]).color];

          return (
            <View key={i.key} style={styles.paginationDotContainer}>
              <Animated.View style={[styles.paginationIndicator, { borderColor: i.color, opacity, transform: [{ translateX }] }]} />
              <View style={[styles.paginationDot, { backgroundColor: i.color }]} />
            </View>
          )
        })
      }
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
  pagination: {
    position: "absolute",
    right: 16,
    bottom: 16,
    flexDirection: "row",
    height: DOT_SIZE,
    // width: 40
  },
  paginationDotContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: DOT_SIZE,
  },
  paginationDot: {
    borderRadius: DOT_SIZE * 0.15,
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3
  },
  paginationIndicator: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    borderColor: "#ccc",
    borderWidth: 2
  }
})
