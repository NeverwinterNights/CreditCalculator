import React from 'react';

import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';

type AppInputPropsType = {
  setText?: (text: string) => void;
  text?: string;
  style?: StyleProp<TextStyle> | StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle> | StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle> | StyleProp<ViewStyle>;
  label?: string;
  // icon?: keyof typeof MaterialCommunityIcons.glyphMap
  // icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  icon?: string;
  width?: number | string;
  direction?: 'left' | 'right';
  error?: string;
  onPress?: () => void;
  onChange?: (text: string) => void;
  onBlur?: Function;
  numeric?: boolean;
};

export const AppInput = ({
  style,
  setText,
  direction = 'left',
  text,
  width = '100%',
  label,
  icon,
  error,
  onBlur,
  labelStyle,
  labelTextStyle,
  onChange,
  numeric,
  // typeChangeHandler,
  ...restProps
}: AppInputPropsType & TextInputProps) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {label && (
        <View style={labelStyle}>
          <Text style={[styles.label, labelTextStyle]}>{label}</Text>
        </View>
      )}
      <View
        style={[
          styles.container,
          {width: width},

          {flexDirection: direction === 'left' ? 'row' : 'row-reverse'},
        ]}>
        {icon && (
          <TouchableOpacity onPress={restProps.onPress}>
            <MaterialCommunityIcons
              name={icon}
              style={styles.icon}
              size={20}
              color={colors.grey}
            />
          </TouchableOpacity>
        )}

        {/*{element &&*/}
        {/*<TouchableOpacity onPress={restProps.onPress}>{element}</TouchableOpacity>}*/}

        <TextInput
          keyboardType={numeric ? 'numeric' : undefined}
          onBlur={onBlur}
          placeholderTextColor={colors.grey}
          onChangeText={setText ? setText : onChange}
          value={text
            ?.replace(/[^\-0-9]/g, '')
            .replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')}
          style={[styles.text, style]}
          {...restProps}
        />
      </View>
      {error && <Text style={{color: 'red', marginBottom: 3}}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 2,
    marginVertical: 2,
    alignItems: 'center',
    borderColor: colors.grey,
    borderWidth: 1,
  },
  label: {
    fontSize: 20,
    fontFamily: 'OleoScriptRegular',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto',
    flex: 1,
  },
});
