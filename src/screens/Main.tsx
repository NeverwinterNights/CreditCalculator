import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Screen} from '../components/Screen';

type MainPropsType = {};

export const Main = ({}: MainPropsType) => {
  return (
    <Screen>
      <View style={styles.container}>
        <Text>aaaaaaaaaaaaaaaaaaaaaaa</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});
