import * as React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { View } from '../../components/Themed';
import layout from "../../constants/Layout";

const { width, height } = layout.window;

type ItemProps = {
  heading: string
  description: string
  index: number
  scrollX: Animated.Value
}

const Item: React.FC<ItemProps> = ({ heading, description, index, scrollX }) => {
  const inputRange = [ (index - 1) * width, index * width, (index + 1) * width ];
  const inputRangeOpacity = [ (index - 0.3) * width, index * width, (index + 0.3) * width ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0]
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0]
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-width * 0.2, 0, width * 0.2]
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.View style={[styles.textContainer, { transform: [{ scale }] }]}>
        <Animated.Text style={[ styles.heading, { transform: [{ translateX }] } ]}>{heading}</Animated.Text>
        <Animated.Text style={[styles.description, { opacity }]}>{description}</Animated.Text>
      </Animated.View>
    </View>
  )
}

export default Item;

const styles = StyleSheet.create({
  itemStyle: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  // imageStyle: {
  //   width: width * 0.75,
  //   height: width * 0.75,
  //   resizeMode: "contain",
  //   flex: 1
  // },
  textContainer: {
    alignItems: "flex-start",
    alignSelf: "flex-end",
    flex: 0.5,
    // backgroundColor: "#ccc"
  },
  heading: {
    textTransform: "uppercase",
    fontWeight: "800",
    fontSize: 24,
    letterSpacing: 2,
    marginBottom: 5,
    color: "#ccc"
  },
  description: {
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    color: "#fff"
  }
});
