import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';

// import {useHeaderHeight} from 'react-native-screens/native-stack';
// import Constants from 'expo-constants';
// import {StatusBar} from 'react-native';

export const Screen = ({children, style}: any) => {
  // const headerHeight = useHeaderHeight();
  // console.log('value', headerHeight);
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[style, styles.flex]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
});
