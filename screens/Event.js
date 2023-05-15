import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebViewComponent from '../components/WebViewComponent'

const Event = ({navigation}) => {
  return (
    <View>
      <WebViewComponent navigation={navigation}/>
    </View>
  )
}

export default Event

const styles = StyleSheet.create({})