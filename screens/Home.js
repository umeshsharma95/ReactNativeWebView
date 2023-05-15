import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Event from '../components/Event'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

const Home = ({navigation}) => {
  const [events, setEvents] = useState([])

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getEventList()
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const getEventList = async(event) => {
    try {
      const jsonValue = await AsyncStorage.getItem('eventList')
      const data = jsonValue != null ? JSON.parse(jsonValue) : [];
      setEvents(data)
      console.log('events', events);
    } catch(e) {
      // error reading value
      console.log(e);
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Events</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Create Event')}>
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList 
          data={events}
          renderItem={({item}) => <Event event={item}/>}
          key={(_, index) => index}
        />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#5D9C59',
    color: '#fff',
    alignItems: 'center',
    padding: 10,
    margin: 12,
    width: 200,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  list: {
    marginBottom: 10
  }
})