import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type AppTextInputPropsType = {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  width?: number | string;
  style?: StyleProp<TextStyle>;
};

export const AppTextInput = ({
  icon,
  width = '100%',
  style,
  ...restProps
}: AppTextInputPropsType & TextInputProps) => {
  return (
    <View style={[styles.container, {width: width}]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          style={styles.icon}
          size={20}
          color={colors.medium}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={[defaultStyles.text, style]}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});
