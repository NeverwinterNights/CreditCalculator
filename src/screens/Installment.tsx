import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppInput} from '../components/AppTextInput';
import {CustomButton} from '../components/CustomButton';
import colors from '../config/colors';
import {getSchedule, removeDigits} from '../utils/utils';
import {ScheduleItem} from '../components/ScheduleItem';

type InstallmentPropsType = {};

type dataInstallment = {
  sum: number;
  range: RangeType;
  additionalSum: number;
  bankAccount: number;
  monthlyIncome: number;
};

type RangeType = 1 | 2 | 3;
export const Installment = ({}: InstallmentPropsType) => {
  const [sum, setSum] = useState('');
  const [range, setRange] = useState<RangeType>(1);
  const [schedule, setSchedule] = useState<string[]>([]);
  const [monthsPayment, setMonthsPayment] = useState(0);
  const [additionalSum, setAdditionalSum] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [data, setData] = useState<dataInstallment>({} as dataInstallment);

  const sumHandler = (value: string) => {
    setSum(value);
  };
  const setRangeHandler = (value: RangeType) => {
    setRange(value);
  };

  const installmentHandler = () => {
    setMonthsPayment(removeDigits(sum) / (range * 12));
    setSchedule(getSchedule(range * 12));
    setData({
      sum: removeDigits(sum),
      range,
      additionalSum: removeDigits(additionalSum),
      bankAccount: removeDigits(additionalSum),
      monthlyIncome: removeDigits(monthlyIncome),
    });
  };

  const clearData = () => {
    setSchedule([]);
    setSum('');
    setRange(1);
    setMonthsPayment(0);
    setAdditionalSum('');
    setMonthlyIncome('');
    setData({} as dataInstallment);
  };

  const AdditionalSumHandler = (value: string) => {
    setAdditionalSum(value);
  };

  const monthlyIncomeHandler = (value: string) => {
    setMonthlyIncome(value);
  };
  const payment = useCallback(
    (bankAccount: number, callback: Function) => {
      if (bankAccount) {
        if (bankAccount >= Math.ceil(monthsPayment)) {
          callback(bankAccount - Math.ceil(monthsPayment));
          return 0;
        } else if (bankAccount < Math.ceil(monthsPayment) && bankAccount > 0) {
          callback(0);
          return Math.ceil(monthsPayment) - bankAccount;
        }
      }
      return Math.ceil(monthsPayment);
    },
    [monthsPayment],
  );

  const result = useMemo(() => {
    let bankAccount = data.bankAccount;

    const minusBankMoney = (value: number) => {
      bankAccount = value;
    };

    return schedule.map(item => {
      return (
        <ScheduleItem
          key={item}
          date={item}
          sum={payment(bankAccount, minusBankMoney)}
        />
      );
    });
  }, [data.bankAccount, payment, schedule]);
  return (
    <ScrollView style={styles.container}>
      <View>
        <AppInput
          label="Введите желаемую сумму"
          labelTextStyle={{fontSize: 12}}
          labelStyle={{width: 80}}
          width={'75%'}
          numeric
          text={sum}
          setText={sumHandler}
          style={{textAlign: 'center'}}
        />
      </View>
      <View>
        <AppInput
          label="Введите имеющуюся сумму"
          labelTextStyle={{fontSize: 12}}
          labelStyle={{width: 80}}
          width={'75%'}
          numeric
          text={additionalSum}
          setText={AdditionalSumHandler}
          style={{textAlign: 'center'}}
        />
      </View>
      <View>
        <AppInput
          label="Введите месячный доход"
          labelTextStyle={{fontSize: 12}}
          labelStyle={{width: 80}}
          width={'75%'}
          numeric
          text={monthlyIncome}
          setText={monthlyIncomeHandler}
          style={{textAlign: 'center'}}
        />
      </View>
      <View style={styles.buttons}>
        <CustomButton
          children={'1 год'}
          style={[
            styles.button,
            {backgroundColor: range === 1 ? colors.primary : colors.grey},
          ]}
          labelStyle={{fontSize: 12}}
          onPress={() => setRangeHandler(1)}
        />
        <CustomButton
          children={'2 года'}
          style={[
            styles.button,
            {backgroundColor: range === 2 ? colors.primary : colors.grey},
          ]}
          labelStyle={{fontSize: 12}}
          onPress={() => setRangeHandler(2)}
        />
        <CustomButton
          children={'3 года'}
          style={[
            styles.button,
            {backgroundColor: range === 3 ? colors.primary : colors.grey},
          ]}
          labelStyle={{fontSize: 12}}
          onPress={() => setRangeHandler(3)}
        />
      </View>
      <View>
        <Text>Общая сумма {data.sum}</Text>
        <Text>Срок рассрочки {data.range ? data.range * 12 : ''} месяцев</Text>
        <Text>Имеющаяся сумма{data.additionalSum}</Text>
        <Text>Месячный доход{data.monthlyIncome}</Text>
        {/*<Text>Сумма на счету в банке{data.bankAccount}</Text>*/}
      </View>
      <CustomButton
        children={'Рассчитать'}
        labelStyle={{fontSize: 12}}
        onPress={installmentHandler}
      />
      <CustomButton
        children={'Сбросить'}
        color="danger"
        labelStyle={{fontSize: 12}}
        onPress={clearData}
      />
      <View>{result}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 110,
  },
});
