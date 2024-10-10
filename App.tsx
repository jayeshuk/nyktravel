import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Feed from './src/screens/Feed';
import Post from './src/screens/Post';
import Profile from './src/screens/Profile';
import {Icon} from '@rneui/themed';

const Tab = createBottomTabNavigator();

export default function App() {
  const [username, setUsername] = React.useState('jayeshuk_2425');
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
    tabBarHideOnKeyboard: true,
  });

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Profile'  screenOptions={configureScreenOptions}>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: 'NYK Travel',
          }}
        />
        <Tab.Screen
          name="Post"
          component={Post}
          options={{
            headerTitle: 'Create New Post',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: username,
            headerRight: () => (
              <Icon type="feather" name="menu" style={{marginRight: 10}} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
