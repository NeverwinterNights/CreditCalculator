import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Screen} from '../components/Screen';
import {CustomButton} from '../components/CustomButton';
import {AppInput} from '../components/AppTextInput';

type dataMain = {
  amount: string;
  rate: string;
  range: string;
};

type MainPropsType = {};
export const Main = ({}: MainPropsType) => {
  const [mainData, setMainData] = useState<dataMain>({} as dataMain);
  const [inputData, setInputData] = useState<dataMain>({} as dataMain);

  const dataInputsChandler = () => {
    setMainData(inputData);
    setInputData({} as dataMain);
  };

  const resetButtonChandler = () => {
    setInputData({} as dataMain);
    setMainData({} as dataMain);
  };

  const inputStateHandler = (key: keyof typeof mainData, value: string) => {
    setInputData({
      ...inputData,
      [key]: value,
    });
  };

  console.log('value', inputData);

  return (
    <Screen>
      <View style={{marginHorizontal: 10}}>
        <AppInput
          label="Введите желаемую сумму"
          labelTextStyle={{fontSize: 12}}
          labelStyle={{width: 80}}
          width={'80%'}
          numeric
          text={inputData.amount}
          setText={value => inputStateHandler('amount', value)}
        />
        <AppInput
          label="Введите процентную ставку"
          labelTextStyle={{fontSize: 12}}
          labelStyle={{width: 80}}
          width={'80%'}
          numeric
          text={inputData.rate}
          setText={value => inputStateHandler('rate', value)}
        />
        <AppInput
          label="Введите срок кредита"
          labelTextStyle={{fontSize: 12}}
          labelStyle={{width: 80}}
          width={'80%'}
          numeric
          text={inputData.range}
          setText={value => inputStateHandler('range', value)}
        />

        <View style={{alignItems: 'center'}}>
          <CustomButton
            children={'Ввести данные'}
            style={{width: 170}}
            labelStyle={{fontSize: 12}}
            onPress={dataInputsChandler}
          />
        </View>

        <View style={styles.amount}>
          <Text style={{marginRight: 10}}>Запрашиваемая сумма</Text>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {mainData.amount}
          </Text>
          <Text style={{marginLeft: 10}}>тысяч евро</Text>
        </View>

        <View style={styles.amount}>
          <Text style={{marginRight: 10}}>Процентная ставка</Text>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {mainData.rate}
          </Text>
          <Text style={{marginLeft: 10}}>%</Text>
        </View>

        <View style={styles.amount}>
          <Text style={{marginRight: 10}}>Срок кредита</Text>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {mainData.range}
          </Text>
          <Text style={{marginLeft: 10}}>лет</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <CustomButton
            children={'Очистить'}
            style={{width: 170}}
            labelStyle={{fontSize: 12}}
            onPress={resetButtonChandler}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  amount: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 45,
  },
});
