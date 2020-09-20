import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, FlatList, Dimensions, Animated } from 'react-native';
import { Text, View } from '../components/Themed';
import slides, { Slide } from '../data/slides';

const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 240;
const LOGO_HEIGHT = 80;
const DOT_SIZE = 40;

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

const Pagination = () => <View style={styles.pagination} />

export default function TabOneScreen() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <Animated.FlatList
        data={slides}
        keyExtractor={(item: Slide) => item.key}
        renderItem={({ item, index }: { item: Slide, index: number }) => <Item {...item} index={index} scrollX={scrollX} />}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: {x: scrollX} } }],
            { useNativeDriver: true }
          )
        }
      />
      <Pagination />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemStyle: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center"
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
  },

  pagination: {
    position: "absolute",
    right: 40,
    bottom: 35,
    backgroundColor: "#fd130e",
    flexDirection: "row",
    height: DOT_SIZE,
    width: 50
  }
});
