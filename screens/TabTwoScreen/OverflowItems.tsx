import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'
import { Poster } from '../../data/posters';
import { Text } from '../../components/Themed';
import { LobsterText } from '../../components/StyledText';

interface Props {
  data: Poster[]
  animatedX: Animated.Value
  index: number
}

const OVERFLOW_HEIGHT = 80;
const OFFSET = 16;

const OverflowItems = ({ data, animatedX, index }: Props) => {
  const inputRange = [-1, 0, 1]
  const translateY = animatedX.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT]
  })
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((i, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <LobsterText style={styles.title} numberOfLines={1}>{i.title}</LobsterText>
              <View style={styles.itemContainerRow}>
                <Text style={styles.location}>
                  <EvilIcons name="location" size={16} style={{ marginRight: 5 }} />
                  <Text>{i.location}</Text>
                </Text>
                <Text>{i.date}</Text>
              </View>
            </View>
          )
        })}
      </Animated.View>
    </View>
  )
}

export default OverflowItems

const styles = StyleSheet.create({
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    marginHorizontal: OFFSET,
    overflow: "hidden"
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    justifyContent: "center"
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 28,
    letterSpacing: 2,
    textTransform: "uppercase"
  },
  location: { fontSize: 16 },
  date: { fontSize: 12 }
})
