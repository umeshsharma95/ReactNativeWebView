import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import moment from 'moment'

const Event = ({event}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Event Name: {event?.eventName}</Text>
      <Text style={styles.text}>Event Address: {event?.eventAddress}</Text>
      <Text style={styles.text}>Event Time: {moment(event?.eventDateTime).format('MMM Do YYYY, h:mm A')}</Text>
    </View>
  )
}

export default Event

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        margin: 10
    },
    text: {
        fontSize: 16,
        fontWeight: '500'
    }

})