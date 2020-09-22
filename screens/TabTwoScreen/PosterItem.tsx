import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../../components/Themed';
import layout from "../../constants/Layout";

const { width } = layout.window;

interface Props {
  
}

const ITEM_WIDTH = width * 0.8
const ITEM_HEIGHT = ITEM_WIDTH * 1.7

const PosterItem = (props: Props) => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default PosterItem

const styles = StyleSheet.create({})
