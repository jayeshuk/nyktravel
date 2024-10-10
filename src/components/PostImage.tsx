import React, {useEffect, useRef, useState} from 'react';
import {View, Image, Dimensions, FlatList, StyleSheet} from 'react-native';
import type {DimensionsType, ImageArr} from '../types';
import {Icon} from '@rneui/base';

export default function PostImage({media}: {media: ImageArr}) {
  const [dimensions, setDimensions] = useState<DimensionsType>({
    width: 0,
    height: 0,
  });
  const [dimensionsArr, setDimensionsArr] = useState<DimensionsType[]>([]);
  const screenWidth = Dimensions.get('window').width;
  const imageListRef = useRef<FlatList<{id: number; uri: string}>>(null);

  const swipeRight = (index: number) => {
    if (
      imageListRef.current?.props.data &&
      index < imageListRef.current?.props.data?.length - 1
    )
      imageListRef.current?.scrollToIndex({
        animated: true,
        index: index + 1,
      });
  };

  const swipeLeft = (index: number) => {
    if (imageListRef.current?.props.data && index > 0)
      imageListRef.current?.scrollToIndex({
        animated: true,
        index: index - 1,
      });
  };

  useEffect(() => {
    if (media.length > 1) {
      // If media is an array, use the first item's uri
      media.forEach(mediaItem => {
        Image.getSize(
          mediaItem.uri,
          (width, height) => {
            const aspectRatio = width / height;
            const scaledHeight = screenWidth / aspectRatio;
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
      ref={imageListRef}
      horizontal
      data={media}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View
          style={{
            height: 400,
            width: dimensionsArr[index]?.width,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={item}
            resizeMode="contain"
            style={{
              height: '100%',
              width: '100%',
            }}
          />
          <View style={styles.navigatingView}>
            <Icon
              type="feather"
              name="chevron-left"
              onPress={() => swipeLeft(index)}
            />
            <Icon
              type="feather"
              name="chevron-right"
              onPress={() => swipeRight(index)}
            />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  navigatingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    position: 'absolute',
  },
});
