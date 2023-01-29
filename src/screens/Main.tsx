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

  // const months = +mainData.range * 12;
  let months = 0;
  if (mainData.range) {
    months = +mainData.range * 12;
  }
  let sum = 0;
  if (mainData.amount) {
    sum = +mainData.amount.replace(/[^\-0-9]/g, '');
  }
  const paymentsArray = new Array(months).fill(Math.round(sum / months));
  console.log('months', months, typeof months);
  console.log('sum', sum, typeof sum);
  console.log('paymentsArray', paymentsArray, typeof paymentsArray);

  // console.log('mainData.amount', +mainData.amount, typeof +mainData.amount);

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
          style={{textAlign: 'center'}}
        />
        <AppInput
          label="Введите процентную ставку"
          labelTextStyle={{fontSize: 12}}
          labelStyle={{width: 80}}
          width={'80%'}
          numeric
          text={inputData.rate}
          setText={value => inputStateHandler('rate', value)}
          style={{textAlign: 'center'}}
        />
        <AppInput
          label="Введите срок кредита"
          labelTextStyle={{fontSize: 12}}
          labelStyle={{width: 80}}
          width={'80%'}
          numeric
          text={inputData.range}
          setText={value => inputStateHandler('range', value)}
          style={{textAlign: 'center'}}
        />

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <CustomButton
            children={'Ввести данные'}
            style={{width: 170}}
            labelStyle={{fontSize: 12}}
            onPress={dataInputsChandler}
          />
          <View style={{alignItems: 'center'}}>
            <CustomButton
              color="danger"
              children={'Очистить'}
              style={{width: 170}}
              labelStyle={{fontSize: 12}}
              onPress={resetButtonChandler}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.amount}>
            <Text style={{marginRight: 10}}>Сумма</Text>
            <Text style={{fontWeight: 'bold'}}>
              {mainData.amount
                ?.replace(/[^\-0-9]/g, '')
                .replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')}
            </Text>
          </View>

          <View style={[styles.amount, {justifyContent: 'center'}]}>
            <Text style={{marginRight: 10}}>Ставка</Text>
            <Text style={{fontWeight: 'bold'}}>{mainData.rate}</Text>
            <Text style={{marginLeft: 10}}>%</Text>
          </View>

          <View style={[styles.amount, {justifyContent: 'center'}]}>
            <Text style={{marginRight: 10}}>Срок</Text>
            <Text style={{fontWeight: 'bold'}}>{mainData.range}</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  amount: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
