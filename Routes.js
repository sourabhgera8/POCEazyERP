import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './apps/screens/SplashScreen';
import CreateUserDetailRecord from './apps/screens/CreateUserDetailRecord';
import Activity from './apps/screens/Activity';
import UserKyc from './apps/screens/UserKyc';
import UserCompleteProfile from './apps/screens/UserCompleteProfile';
import ReportScreen from './apps/screens/ReportScreen';
import ReportKycScreen from './apps/screens/ReportKycScreen';

const Stack = createNativeStackNavigator();
  
  function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">

          <Stack.Screen  options={{headerShown: false}}  name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="CreateUserDetailRecord" component={CreateUserDetailRecord} />
          <Stack.Screen options={{headerShown: false}}  name="Activity" component={Activity} />
          <Stack.Screen name="UserKyc" component={UserKyc} />
          <Stack.Screen name="UserCompleteProfile" component={UserCompleteProfile} />
          <Stack.Screen name="ReportScreen" component={ReportScreen} />
          <Stack.Screen name="ReportKycScreen" component={ReportKycScreen} />
      
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default Routes;