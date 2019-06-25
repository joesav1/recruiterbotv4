import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {   Image,  Platform,  ScrollView,  StyleSheet,  Text,  TouchableOpacity,  View,} from 'react-native';

import { TestComponent } from './../components/AppComponents/TestComponent';

export default function TestScreen() {
  return (
    <View>
      <TestComponent/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
