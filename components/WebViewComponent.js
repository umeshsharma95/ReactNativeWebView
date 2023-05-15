import {
    BackHandler,
    Button,
    Platform,
    StyleSheet,
    View,
  } from 'react-native';
  import React, {useEffect, useRef} from 'react';
  import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const WebViewComponent = ({navigation}) => {
    const webViewRef = useRef(null);
    const handleWebViewNavigationStateChange = newNavState => {
      console.log('newNavState', newNavState);
    };
  
    const runFirst = `
        document.getElementById("redirectToAppButton").addEventListener("ready", function () {
          webViewRef.current.goBack();
          // window.ReactNativeWebView.reload()
        });
        true; // note: this is required, or you'll sometimes get silent failures
      `;
  
    const closeWebView = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        navigation.goBack()
        return true; // prevent default behavior (exit app)
      }
      return false;
    };

    const handleMessages = async(message) => {
      console.log('message', message);
      const msg = JSON.parse(message)
      if(msg.type === 'createEvent') {
        createEvent(msg.data)
      } else if(msg.type === 'closeWebView') {
        closeWebView()
      }
    }

    const createEvent = async(event) => {
      try {
        const jsonValue = await AsyncStorage.getItem('eventList')
        const data = jsonValue != null ? JSON.parse(jsonValue) : [];
        await AsyncStorage.setItem('eventList', JSON.stringify([...data, event]))
        closeWebView()
      } catch(e) {
        // error reading value
      }

    }
  
    useEffect(() => {
      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', closeWebView);
        return () => {
          BackHandler.removeEventListener(
            'hardwareBackPress',
            closeWebView,
          );
        };
      }
    }, []);
  
    return (
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{uri: 'https://main--endearing-brigadeiros-bc55d8.netlify.app/'}}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          onMessage={event => {
            console.log('onMessage', event);
            handleMessages(event?.nativeEvent?.data)
          }}
          // injectedJavaScript={runFirst}
          onError={console.log}
        />
      </View>
    );
  };
  
  export default WebViewComponent;
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
  });
  