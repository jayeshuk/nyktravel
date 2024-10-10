import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import {Button} from '@rneui/themed';
import { Asset } from 'react-native-image-picker';
import colors from '../styles/colors';
import { ToastMessage } from '../utilities';
import {ImagePickerAndList} from '../components/';

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
      <ImagePickerAndList images={images} setImages={setImages} />

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
