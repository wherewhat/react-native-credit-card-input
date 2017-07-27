import React, { Component, PropTypes } from "react";
import ReactNative, {
  NativeModules,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get('window');
const Constants = {
  SCREEN_SIZE: {
  	width: width,
  	height: height
  },
}

module.exports = Constants;