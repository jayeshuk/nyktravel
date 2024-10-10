import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import user_data from '../data/user.json';
import {UserInfo, ImageGrid} from '../components';

export default function Profile() {
  const buttonNames = ['Edit profile', 'Share profile'];
  const renderButton = (item: string, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.profileButton}
        // styl
        // titleStyle={styles.profileButtonTitle}
        // containerStyle={styles.profileButton}
      >
        <Text style={styles.profileButtonTitle}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 10}}>
        <UserInfo user={user_data} />
        <Text style={styles.userBio}>{user_data.bio}</Text>
        <View style={styles.profileButtonView}>
          {buttonNames.map(renderButton)}
        </View>
      </View>
      <ImageGrid user={user_data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    overflow: 'visible',
  },
  userBio: {color: colors.black},
  profileButtonView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
    justifyContent: 'space-around',
  },
  profileButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 10,
  },
  profileButtonTitle: {
    color: colors.black,
    fontWeight: '500',
    fontSize: 15,
  },
});
