import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from '@rneui/themed';
import colors from '../styles/colors';
import { User } from '../types';

export default function UserInfo({user}:{user: User}) {
  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.userProfileView}>
        <Avatar size={72} rounded source={{uri: user.profile}}>
          <Avatar.Accessory size={23} />
        </Avatar>
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <View style={styles.connectionsView}>
        <View style={styles.connectionContainer}>
          <Text style={styles.connectionValue}>{user.posts.length}</Text>
          <Text style={styles.connectionLabel}>posts</Text>
        </View>

        <View style={styles.connectionContainer}>
          <Text style={styles.connectionValue}>{user.followers}</Text>
          <Text style={styles.connectionLabel}>followers</Text>
        </View>

        <View style={styles.connectionContainer}>
          <Text style={styles.connectionValue}>{user.following}</Text>
          <Text style={styles.connectionLabel}>following</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userProfileView: {
    alignItems: 'center',
  },
  name: {
    marginTop: 10,
    color: colors.black,
    fontWeight: '500',
    fontSize: 16,
  },
  connectionsView: {
    marginLeft: 30,
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  connectionContainer: {alignItems: 'center'},
  connectionValue: {fontSize: 20, fontWeight: '500', color: colors.black},
  connectionLabel: {fontSize: 16, color: colors.black},
});
