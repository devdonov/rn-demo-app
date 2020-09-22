import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '../../components/Themed';
import posters from '../../data/posters';
import slides from '../../data/slides';
import OverflowItems from './OverflowItems';

const SPACING = 16;

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <OverflowItems data={posters} />
      <FlatList
        data={slides}
        keyExtractor={(_, index) => String(index)}
        horizontal
        inverted
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          padding: SPACING * 2
          // alignItems: "center"
        }}
        CellRendererComponent={({ item, index, style, children, ...props }) => {
          return <View index={index} style={style} {...props}>{children}</View>
        }}
        renderItem={({ item }) => <View />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
