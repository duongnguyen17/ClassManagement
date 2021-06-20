import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Classes from './screens/Classes';
import Class from './screens/Class';
import Subjects from './screens/Subjects';
import Teachers from './screens/Teachers';
import StudentInfor from './screens/StudentInfor';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
const Tab = AnimatedTabBarNavigator();
const MainStack = createStackNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Classes'}
      tabBarOptions={{
        activeTintColor: '#3399ff',
        inactiveTintColor: '#222222',
        activeBackgroundColor: '#e6e6e6',
        tabStyle: {shadow: true, tabBarBackground: '#4d94ff'}, //không thấy có thay đổi gì
        labelStyle: {
          fontSize: 18,
        },
      }}>
      <Tab.Screen
        name="Teachers"
        component={Teachers}
        options={{
          tabBarIcon: ({focused, color}) => (
            <FontAwesome5
              name="chalkboard-teacher"
              size={focused ? 24 : 30}
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Classes"
        component={Classes}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name="google-classroom"
              size={focused ? 23 : 30}
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Subjects"
        component={Subjects}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons
              name="subject"
              size={focused ? 24 : 30}
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Main"
          component={TabBar}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="Class"
          component={Class}
          options={({route}) => ({
            title: route.params.name,
            headerStatusBarHeight: -15,
            headerStyle: {
              backgroundColor: '#0099e6',
            },
          })}
        />
        <MainStack.Screen name="StudentInfor" component={StudentInfor} options={{title:'Thông tin học sinh'}} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
