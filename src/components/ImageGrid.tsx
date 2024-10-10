import React from 'react';
import {View, FlatList, Image, StyleSheet} from 'react-native';
import {UserPosts, User} from '../types';
import colors from '../styles/colors';

export default function ImageGrid({user}: {user: User}) {
  const assignKey = (item: UserPosts) => item.id.toString();
  const renderImage = ({item}: {item: UserPosts}) => (
    <View style={styles.imageView}>
      <Image style={styles.image} source={{uri: item.src}} resizeMode="cover" />
    </View>
  );

  return (
    <FlatList
      data={user.posts}
      keyExtractor={assignKey}
      numColumns={3}
      renderItem={renderImage}
    />
  );
}

const styles = StyleSheet.create({
  imageView: {
    height: 140,
    width: '34%'
  },
  image: {
    height: 140,
    borderWidth: 1,
    borderColor: colors.white
  },
});
