import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {AppInput} from '../components/AppTextInput';
// import {countMonths, monthsPayment} from '../utils/utils';
import colors from '../config/colors';
import {getSchedule, removeDigits} from '../utils/utils';
import {ScheduleItem} from '../components/ScheduleItem';
// import {getSchedule} from '../utils/utils';

type dataMain = {
  amount: string;
  rate: string;
  range: string;
};
type TypeCreditType = 'Аннуитетный' | 'Дифференцированный';

export const Credit = () => {
  const [mainData, setMainData] = useState<dataMain>({} as dataMain);
  const [inputData, setInputData] = useState<dataMain>({} as dataMain);
  const [creditType, setCreditType] = useState<TypeCreditType>('Аннуитетный');
  const [schedule, setSchedule] = useState<string[]>([]);
  const [monthsPayment, setMonthsPayment] = useState(0);

  const annuitySum = () => {
    const rateMounts = removeDigits(inputData.rate) / (100 * 12);
    return Math.ceil(
      removeDigits(inputData.amount) *
        (rateMounts / (1 - (1 + rateMounts) ** -(+inputData.range * 12))),
    );
  };

  const dataInputsChandler = () => {
    setMainData(inputData);
    // setInputData({} as dataMain);
    setSchedule(getSchedule(+inputData.range * 12));
    setMonthsPayment(
      Math.ceil(removeDigits(inputData.amount) / (+inputData.range * 12)),
    );
  };

  const resetButtonChandler = () => {
    setInputData({} as dataMain);
    setMainData({} as dataMain);
    setSchedule([]);
  };
  const creditTypeHandler = (value: TypeCreditType) => {
    setCreditType(value);
  };

  const inputStateHandler = (key: keyof typeof mainData, value: string) => {
    setInputData({
      ...inputData,
      [key]: value,
    });
  };

  const payment = useCallback(
    (creditSum: number, callback: Function) => {
      callback(+removeDigits(inputData.amount) / (+inputData.range * 12));

      return Math.ceil(
        monthsPayment +
          ((creditSum * (+removeDigits(inputData.rate) / 100)) / 365) * 30.5,
      );
    },
    [inputData.amount, inputData.range, inputData.rate, monthsPayment],
  );

  const resultDif = useMemo(() => {
    let creditSum = +removeDigits(inputData.amount);
    const minusCreditSum = (value: number) => {
      creditSum = creditSum - value;
      // creditSum - (+removeDigits(inputData.amount) / +inputData.range) * 12;
    };

    return schedule.map(item => {
      return (
        <ScheduleItem
          key={item}
          date={item}
          sum={payment(creditSum, minusCreditSum)}
        />
      );
    });
  }, [inputData.amount, payment, schedule]);

  return (
    <ScrollView>
      <View style={{marginHorizontal: 13, marginVertical: 20}}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Расчет рассрочки</Text>
        </View>
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
          <CustomButton
            color={creditType === 'Аннуитетный' ? 'primary' : 'grey'}
            onPress={() => creditTypeHandler('Аннуитетный')}
            style={{width: '47%', paddingHorizontal: 20}}
            labelStyle={{
              fontSize: 10,
              color: creditType === 'Аннуитетный' ? 'white' : 'black',
            }}
            children={'Аннуитетный'}
          />
          <CustomButton
            color={creditType === 'Дифференцированный' ? 'primary' : 'grey'}
            onPress={() => creditTypeHandler('Дифференцированный')}
            style={{width: '47%', paddingHorizontal: 20}}
            labelStyle={{
              fontSize: 10,
              color: creditType === 'Дифференцированный' ? 'white' : 'black',
            }}
            children={'Дифференцированный'}
          />
        </View>
        <View>
          {creditType === 'Аннуитетный'
            ? schedule.map(item => (
                <ScheduleItem key={item} date={item} sum={annuitySum()} />
              ))
            : resultDif}
        </View>
      </View>
    </ScrollView>
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
  title: {
    alignItems: 'center',
    marginBottom: 15,
    fontSize: 20,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
