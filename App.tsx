import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Feed from './src/screens/Feed';
import Post from './src/screens/Post';
import Profile from './src/screens/Profile';

const Tab = createBottomTabNavigator();

export default function App() {
  const tabIcon = (tab: string) => {
    switch (tab) {
      case 'Feed':
        return 'file-tray-full';
      case 'Post':
        return 'create';
      case 'Profile':
        return 'person-circle';
      default:
        return '';
    }
  };

  const configureScreenOptions = ({route}: any) => ({
    tabBarIcon: ({
      focused,
      color,
      size,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }) => <Ionicons name={tabIcon(route.name)} size={size} color={color} />,
    tabBarActiveTintColor: '#972FCA',
    headerShown: false,
  });

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={configureScreenOptions}>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            headerShown: true,
            headerTitle:"NYK Travel"
          }}
        />
        <Tab.Screen name="Post" component={Post} options={{
            headerShown: true,
            headerTitle:"Create New Post"
          }} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
