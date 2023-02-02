import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppInput} from './AppTextInput';

type InputItemPropsType = {
  title: string;
  numericItem?: boolean;
};

export const InputItem = ({title, numericItem}: InputItemPropsType) => {
  const [itemValue, setItemValue] = useState('');

  return (
    <View style={styles.input}>
      <Text style={{width: 95, fontSize: 12}}>{title}</Text>
      <View style={{flex: 1}}>
        <AppInput
          setText={setItemValue}
          text={itemValue}
          numeric={numericItem ? numericItem : false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  customButton: {
    marginLeft: 10,
    width: 100,
    height: 50,
    borderRadius: 10,
  },
});
