import {Icon} from '@rneui/themed';
import React, {SetStateAction} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ImageLibraryOptions, Asset} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import colors from '../styles/colors';

type Props = {
  images: Asset[];
  setImages: React.Dispatch<React.SetStateAction<Asset[]>>;
};

export default function ImagePickerAndList({images, setImages}: Props) {
  const handleImagePick = async () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 10,
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

  return (
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
  );
}

const styles = StyleSheet.create({
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
});
