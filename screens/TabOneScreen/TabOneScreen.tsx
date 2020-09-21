import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { View } from '../../components/Themed';
import slides, { Slide } from '../../data/slides';
import layout from "../../constants/Layout";
import Item from './Item';
import Pagination from './Pagination';
import Ticker from './Tricker';
import CircleSlider from './CircleSlider';

const { width, height } = layout.window;

const LOGO_WIDTH = 240;
const LOGO_HEIGHT = 80;

export default function TabOneScreen() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <CircleSlider scrollX={scrollX} data={slides} />
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
      <Pagination data={slides} scrollX={scrollX} />

      <Ticker scrollX={scrollX} data={slides} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
