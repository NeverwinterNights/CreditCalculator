import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {addDigits} from '../utils/utils';

type ScheduleItemPropsType = {
  date: string;
  sum: number;
};

export const ScheduleItem = ({date, sum}: ScheduleItemPropsType) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View>
        <Text>{sum === 0 ? 0 : addDigits(sum)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
