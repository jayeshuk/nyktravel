import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import colors from '../styles/colors';
import {PostCard} from '../components';
import { Post } from '../types';
import data from '../data/posts_large.json';

const PAGE_SIZE = 10;

export default function Feed() {
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
