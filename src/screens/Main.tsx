import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {Screen} from '../components/Screen';
import {CustomButton} from '../components/CustomButton';
import {AppInput} from '../components/AppTextInput';
// import {countMonths, monthsPayment} from '../utils/utils';
import colors from '../config/colors';
// import {getSchedule} from '../utils/utils';

type dataMain = {
  amount: string;
  rate: string;
  range: string;
};

type MainPropsType = {};
export const Main = ({}: MainPropsType) => {
  const [mainData, setMainData] = useState<dataMain>({} as dataMain);
  const [inputData, setInputData] = useState<dataMain>({} as dataMain);
  const [differentiated, setDifferentiated] = useState(false);

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
  const toggleSwitch = () => setDifferentiated(previousState => !previousState);

  // const paymentsArray = new Array(countMonths(+mainData.range)).fill(
  //   monthsPayment(mainData.amount, countMonths(+mainData.range)),
  // );

  return (
    <Screen>
      <View style={{marginHorizontal: 13}}>
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
        <View style={styles.creditType}>
          <Text
            style={!differentiated ? {backgroundColor: colors.primary} : null}>
            Аннуитетный
          </Text>

          <Switch value={differentiated} onValueChange={toggleSwitch} />
          <Text
            style={
              differentiated
                ? {backgroundColor: colors.primary, marginLeft: 7}
                : {marginLeft: 7}
            }>
            Дифференцированный
          </Text>
        </View>
        {/*<View style={styles.months}>*/}
        {/*  {paymentsArray.map((el, index) => (*/}
        {/*    <View key={index} style={styles.monthsElement}>*/}
        {/*      <Text style={styles.monthsText}>{el}</Text>*/}
        {/*    </View>*/}
        {/*  ))}*/}
        {/*</View>*/}
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
  months: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  monthsElement: {
    width: '17.5%',
    alignItems: 'center',
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  monthsText: {
    fontSize: 12,
  },
  creditType: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
