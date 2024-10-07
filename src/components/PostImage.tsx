import React, {useEffect, useState} from 'react';
import {View, Text, Image, Dimensions, FlatList} from 'react-native';
import type {DimensionsType, ImageArr} from '../types';

export default function PostImage({media}: {media: ImageArr}) {
  const [dimensions, setDimensions] = useState<DimensionsType>({
    width: 0,
    height: 0,
  });
  const [dimensionsArr, setDimensionsArr] = useState<DimensionsType[]>([]);
  const [minHeight, setMinHeight] = useState<number>(2000);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (media.length > 1) {
      // If media is an array, use the first item's uri
      media.forEach(mediaItem => {
        Image.getSize(
          mediaItem.uri,
          (width, height) => {
            const aspectRatio = width / height;
            const scaledHeight = screenWidth / aspectRatio;
            if(scaledHeight < minHeight) {setMinHeight(scaledHeight);}
            setDimensionsArr(dimensionsArr => [
              ...dimensionsArr,
              {width: screenWidth, height: scaledHeight},
            ]);
          },
          error => {
            console.log('Error fetching image dimensions:', error);
          },
        );
      });
    } else {
      // If media is a single object, use its uri
      Image.getSize(
        media[0].uri,
        (width, height) => {
          const aspectRatio = width / height;
          const scaledHeight = screenWidth / aspectRatio;
          setDimensions({width: screenWidth, height: scaledHeight});
        },
        error => {
          console.log('Error fetching image dimensions:', error);
        },
      );
    }
  }, [media]);

  return !(media.length > 1) ? (
    <Image
      source={media}
      style={{width: dimensions.width, height: dimensions.height}}
      resizeMode="contain"
    />
  ) : (
    <FlatList
      horizontal
      data={media}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View
          style={{
            height: minHeight,
            width: dimensionsArr[index]?.width,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={item}
            resizeMode="contain"
            style={{
              height: minHeight,
            width: dimensionsArr[index]?.width,
            }}
          />
        </View>
      )}
    />
  );
}
