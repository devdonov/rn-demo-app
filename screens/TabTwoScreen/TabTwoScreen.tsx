import * as React from 'react';
import { StyleSheet, FlatList, View, Animated } from 'react-native';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import posters from '../../data/posters';
import OverflowItems from './OverflowItems';
import PosterItem from './PosterItem';

const SPACING = 16;

export default function TabTwoScreen() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);

  const setActiveIndex = React.useCallback(activeIndex => {
    scrollX.setValue(activeIndex);
    setIndex(activeIndex)
  }, []);

  React.useEffect(() => {
    scrollX.setValue(index);
    Animated.spring(scrollXAnimated, {
      toValue: scrollX,
      useNativeDriver: true
    }).start();
  })

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={e => {
        if (e.nativeEvent.state === State.END) {
          const newIndex = index === (posters.length - 1) ? 0 : index + 1;
          setActiveIndex(newIndex);
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={e => {
          if (e.nativeEvent.state === State.END) {
            const newIndex = index === 0 ? posters.length - 1 : index - 1;
            setActiveIndex(newIndex);
          }
        }}
      >
        <View style={styles.container}>
          <OverflowItems index={index} animatedX={scrollXAnimated} data={posters} />
          <FlatList
            data={posters}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            scrollEnabled={false}
            removeClippedSubviews={false}
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              padding: SPACING * 2,
              // alignItems: "center"
            }}
            CellRendererComponent={({ item, index, style, children, ...props }) => {
              const newStyle = [style, { zIndex: posters.length - index }]
              return <View index={index} style={newStyle} {...props}>{children}</View>
            }}
            renderItem={({ item, index }) => <PosterItem index={index} animatedX={scrollXAnimated} poster={item}  />}
          />
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});
