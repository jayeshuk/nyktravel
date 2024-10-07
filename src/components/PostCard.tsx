import React from 'react';
import {Avatar, Icon} from '@rneui/themed';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../styles/colors';
import PostImage from './PostImage';
import {PostCardProps} from '../types';

function formatDate(dateString: string) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [day, month, year] = dateString.split('/');

  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}

function PostCard({details}: PostCardProps) { 

  return (
    <View style={styles.container}>
      <View style={styles.userInfoView}>
        <Avatar size={48} rounded source={details.attributes.avatar} />
        <Text style={styles.userText}>{details.attributes.username}</Text>
      </View>
      <PostImage media={details.attributes.post.media} />

      <View style={styles.captionContainer}>
        <View style={styles.postActionsContainer}>
          <View style={styles.postActions}>
            <Icon type="antdesign" name="hearto" />
            <Icon type="fontisto" name="comment" />
            <Icon type="feather" name="send" />
          </View>
          <Icon type="font-awesome" name="bookmark-o" size={26} />
        </View>
        <Text style={styles.caption}>{details.attributes.post.caption}</Text>
        <Text style={styles.date}>
          {formatDate(details.attributes.post.date)}
        </Text>
      </View>
    </View>
  );
}

export default React.memo(PostCard);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  userInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userText: {
    fontSize: 24,
    marginLeft: 10,
    color: colors.black,
  },
  captionContainer: {
    padding: 10,
    alignItems: 'flex-start',
  },
  postActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  postActions: {flexDirection: 'row', gap: 10},
  caption: {
    fontSize: 16,
    marginTop: 10,
    color: colors.black,
  },
  date: {},
});
