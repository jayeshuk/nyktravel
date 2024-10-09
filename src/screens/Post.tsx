import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text, Image, FlatList} from 'react-native';
import {Icon} from '@rneui/base';
import colors from '../styles/colors';

export default function Post() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const imageData = [
    {id: -1, uri: ''},
    // {id: 1, uri: 'http://dummyimage.com/540x626.png/dddddd/000000'},
    // {id: 2, uri: 'http://dummyimage.com/540x626.png/dddddd/000000'},
  ];

  const renderImageList = ({item}: {item: any}) =>
    item.uri ? (
      <Image
        source={{uri: item.uri}}
        style={{width: 200, height: 180}}
        resizeMode="cover"
      />
    ) : (
      <View style={styles.mediaUploadView}>
        <View style={styles.iconView}>
          <Icon type="ionicon" name="images-outline" size={38} />
          <Icon type="antdesign" name="plus" size={19} />
          <Icon type="octicon" name="video" size={38} />
        </View>
        <Text>Upload Photos or Videos</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.mediaListContainer}>
        <FlatList
          horizontal
          data={imageData}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={
            imageData.length === 1 ? styles.listContainer : null
          }
          renderItem={renderImageList}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Post Title"
          style={styles.input}
        />
        <TextInput
          multiline
          value={caption}
          onChangeText={setCaption}
          placeholder="Write a caption..."
          numberOfLines={3}
          style={[styles.input, styles.captionInput]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  mediaListContainer: {
    height: '25%',
    borderWidth: 1,
    borderRadius: 15,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaUploadView: {
    height: 180,
    width: 200,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
  inputView: {
    marginTop: '5%',
  },
  input: {
    fontSize: 16,
    textAlignVertical: 'top',
    borderBottomWidth: 1,
  },
  captionInput: {
    marginTop: '5%',
  },
});
