import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import colors from '../styles/colors';
import PostCard from '../components/PostCard';
// import data from '../data/posts.json';
import data from '../data/posts_large.json';
import { Post } from '../types';

const PAGE_SIZE = 10;

export default function Feed() {
  const posts_local = [
    {
      id: 1,
      attributes: {
        avatar: {uri: 'https://randomuser.me/api/portraits/men/36.jpg'},
        username: 'Alex Deere',
        post: {
          caption:
            'The idea with React Native Elements is more about component structure than actual design.',
          date: '10/11/2015',
          media: [
            {
              id: 0,
              uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            },
          ],
        },
      },
    },
    {
      id: 2,
      attributes: {
        avatar: {uri: 'https://randomuser.me/api/portraits/men/35.jpg'},
        username: 'Fed Nash',
        post: {
          caption:
            'The idea with React Native Elements is more about component structure than actual design.',
          date: '4/9/2020',
          media: [
            {
              id: 0,
              uri: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
            },
          ],
        },
      },
    },
    {
      id: 3,
      attributes: {
        avatar: {uri: 'https://randomuser.me/api/portraits/women/40.jpg'},
        username: 'Athena Grant',
        post: {
          caption:
            'The idea with React Native Elements is more about component structure than actual design.',
          date: '2/10/2015',
          media: [
            {
              id: 0,
              uri: 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?cs=srgb&dl=pexels-fotios-photos-1107717.jpg&fm=jpg',
            },
            {
              id: 1,
              uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            },
            {
              id: 2,
              uri: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
            },
          ],
        },
      },
    },
  ];
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMoreData();
  }, [page]);

  const loadMoreData = () => {
    if (loading) return;

    setLoading(true);
    // Simulate pagination by slicing the JSON data
    const newPosts = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    setPosts([...posts, ...newPosts]);
    setLoading(false);
  };

  const loadNextPage = () => {
    if (posts.length < data.length) {
      setPage(page + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => <PostCard details={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadNextPage} // Trigger when the list ends
        onEndReachedThreshold={0.5} // Load more when 50% scrolled
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
