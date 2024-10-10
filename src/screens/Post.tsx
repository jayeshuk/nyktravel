import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Button, Icon} from '@rneui/themed';
import * as ImagePicker from 'react-native-image-picker';
import {ImageLibraryOptions, Asset} from 'react-native-image-picker';
import colors from '../styles/colors';
import { ToastMessage } from '../utilities';

export default function Post() {
  const initialImages = [
    {
      fileName: 'sample',
      fileSize: 0,
      height: 1280,
      originalPath: '',
      type: 'image/jpeg',
      uri: '',
      width: 960,
    }
  ]
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState<Asset[]>(initialImages);

  const renderImageList = ({item}: {item: Asset}) =>
    item.uri ? (
      <Image
        source={{uri: item.uri}}
        style={{
          width: 200,
          height: 180,
          borderWidth: 1,
          borderColor: colors.white,
        }}
        resizeMode="cover"
      />
    ) : (
      <TouchableOpacity onPress={handleImagePick}>
        <View style={styles.mediaUploadView}>
          <View style={styles.iconView}>
            <Icon type="ionicon" name="images-outline" size={38} />
            <Icon type="antdesign" name="plus" size={19} />
            <Icon type="octicon" name="video" size={38} />
          </View>
          <Text>Upload Photos or Videos</Text>
        </View>
      </TouchableOpacity>
    );

  const handleImagePick = async () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit:10,
    };
    const res = await ImagePicker.launchImageLibrary(options);
    if (res.didCancel) {
      console.log('User cancelled');
    } else if (res.errorCode) {
      console.log('ImagePickerError: ', res.errorMessage);
    } else {
      console.log(
        'ImagePickerResponse:',
        res.assets?.length,
        'image/s selected',
      );
      let temp = images;
      res.assets?.forEach((image: Asset) => {
        temp.push(image);
      });
      setImages([...temp]);
    }
  };

  const validInputs = () => {
    if(images.length<2){
      ToastMessage("Upload atleast 1 media file");
      return false;
    }
    if(title.length < 3){
      ToastMessage("Title must be at least 3 characters");
      return false;
    } 

    if(caption.length < 10){
      ToastMessage("Caption must be at least 10 characters");
      return false;
    }

    return true;
  }

  const handlePost = () => {
    if(validInputs()){
      Keyboard.dismiss();
      setImages(initialImages);
      setTitle('');
      setCaption('');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mediaListContainer}>
        <FlatList
          horizontal
          data={images}
          keyExtractor={item => item.uri ?? ''}
          contentContainerStyle={
            images.length === 1 ? styles.listContainer : null
          }
          renderItem={renderImageList}
          showsHorizontalScrollIndicator={false}
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

      <Button title="Post" containerStyle={styles.buttonContainer} onPress={handlePost} />
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
    height: 180,
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
    borderBottomColor:'grey'
  },
  captionInput: {
    marginTop: '5%',
  },
  buttonContainer: {marginVertical: 10, borderRadius: 10},
});
