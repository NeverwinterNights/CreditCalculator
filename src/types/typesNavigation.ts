import {NavigationProp} from '@react-navigation/native';

export type RootTabParamList = {
  // типизация  Stack, чтобы не ошибиться с экранами
  Credit: undefined;
  Installment: undefined;
};

export type RootStackParamList = {
  Stack1: undefined;
  Stack2: {id: string} | undefined;
};

// export type HomeProps = NativeStackScreenProps<RootTabParamList, 'Home'>; // типизация самого экрана Home
// export type UsersProps = NativeStackScreenProps<RootTabParamList, 'Users'>;
// export type DetailsProps = NativeStackScreenProps<RootTabParamList, 'Details'>;

export type NavigationUseType = NavigationProp<RootTabParamList>;
