import React from 'react';
// import {Main} from './src/screens/Main';
import {Installment} from './src/screens/Installment';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './src/types/typesNavigation';
import {Credit} from './src/screens/Credit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const App = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route, navigation}) => {
          //console.log('tab nav', navigation )
          return {
            headerShown: false,
            tabBarLabelStyle: {color: 'grey'},
            tabBarIcon: ({focused}) => {
              let iconName;
              if (route.name === 'Credit') {
                iconName = 'home-account';
              }
              if (route.name === 'Installment') {
                iconName = 'finance';
              }
              return (
                <MaterialCommunityIcons
                  name={iconName as any}
                  size={30}
                  color={focused ? 'black' : 'grey'}
                  onPress={() => {
                    navigation.navigate(route.name);
                  }}
                />
              );
            },
          };
        }}>
        <Tab.Screen name={'Installment'} component={Installment} />
        <Tab.Screen name={'Credit'} component={Credit} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

// <Tab.Navigator
//   screenOptions={({route, navigation}) => {
//     //console.log('tab nav', navigation )
//     return {
//       headerShown:false,
//       tabBarIcon: ({focused}) => {
//         let iconName
//         if (route.name === "Credit") {
//           iconName = "home"
//         }
//         if (route.name === "Installment") {
//           iconName = "users"
//         }
//         return <Icon name={iconName as any} size={30} color="#900" onPress={() => {
//           navigation.navigate(route.name)
//         }}/>
//       }
//     }
//   }}/>
