import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../styles/colors';
import user_data from '../data/user.json';
import {UserInfo} from '../components/';

export default function Profile() {
  return (
    <View style={styles.container}>
      <UserInfo user={user_data} />
      <Text style={styles.userBio}>{user_data.bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  userBio: {color: colors.black},
});
