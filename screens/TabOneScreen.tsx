import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import slides from '../data/slides';

const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 240;
const LOGO_HEIGHT = 80;
const DOT_SIZE = 40;

type ItemProps = {
  heading: string
  description: string
}

const Item: React.FC<ItemProps> = ({ heading, description }) => {
  return (
    <View style={styles.itemStyle}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}

const Pagination = () => <View style={styles.pagination} />

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <FlatList
        data={slides}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => <Item {...item} />}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
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
    backgroundColor: "#ccc"
  },
  heading: {
    textTransform: "uppercase",
    fontWeight: "800",
    fontSize: 24,
    letterSpacing: 2,
    marginBottom: 5
  },
  description: {
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5
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
