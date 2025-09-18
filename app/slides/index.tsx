import ThemedButton from '@/presentation/shared/ThemedButton';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, Image, ImageSourcePropType, NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions } from 'react-native';


interface Slide {
  title: string;
  desc: string;
  img: ImageSourcePropType;
}

const items: Slide[] = [
  {
    title: 'Titulo 1',
    desc: 'Ea et eu enim fugiat sunt reprehenderit sunt aute quis tempor ipsum cupidatat et.',
    img: require('../../assets/images/slides/slide-1.png'),
  },
  {
    title: 'Titulo 2',
    desc: 'Anim est quis elit proident magna quis cupidatat curlpa labore Lorem ea. Exercitation mollit velit in aliquip tempor occaecat dolor minim amet dolor enim cillum excepteur. ',
    img: require('../../assets/images/slides/slide-2.png'),
  },
  {
    title: 'Titulo 3',
    desc: 'Ex amet duis amet nulla. Aliquip ea Lorem ea culpa consequat proident. Nulla tempor esse ad tempor sit amet Lorem. Velit ea labore aute pariatur commodo duis veniam enim.',
    img: require('../../assets/images/slides/slide-3.png'),
  },
];
const SlidesScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  //esta implementación es para controlar el scroll
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if(isScrollEnabled){
      return;
    }

    //offset: lo que se esta moviendo, lo que sobrepasa
    //layoutmeasurement: nos indica el tamaño del layout
    const {contentOffset, layoutMeasurement} = event.nativeEvent;

    //la división dentro del .floor es por ej si tengo
    //width: 900 y tengo 3 slides: 900/3=600px y con eso
    //mas o menos determino que estoy en el slide X
    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);

    setCurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);

    if(currentIndex === items.length -1){
      setIsScrollEnabled(true);
    }
  }

  const scrollToSlide = (index: number) => {
    if(!flatListRef.current) return; 

    flatListRef.current.scrollToIndex({
      index: index,
      animated: true
    })
  }

  return (
    <ThemedView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) =>
          <SlideItem item={item}></SlideItem>
        }
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEnabled={isScrollEnabled}
      />

        {
          (currentSlideIndex === items.length - 1)
          ? (
            <ThemedButton
              className='absolute bottom-10 right-5 w-[150px]'
              onPress={()=>router.dismiss()}
            >
              Finalizar
            </ThemedButton>
          ) : (
            <ThemedButton
              className='absolute bottom-10 right-5 w-[150px]'
              onPress={() => scrollToSlide(currentSlideIndex + 1)}>
              Siguiente
            </ThemedButton>
          )
        }
      
    </ThemedView>
  );
};
export default SlidesScreen;

interface SlideItemProps {
  item: Slide;
}

const SlideItem = ({ item }: SlideItemProps) => {
  const { width } = useWindowDimensions();
  const { title, desc, img } = item;

  return (
    <ThemedView
      className='flex-1 rounded p-10 justify-center bg-red-500'
      style={{ width }}
    >
      <Image
        source={item.img}
        style={{
          width: width * 0.7,
          height: width * 0.7,
          resizeMode: 'center',
          alignSelf: 'center'
        }}
      />

      <ThemedText
        type='h1'
        className='text-light-primary dark:text-dark-primary'
        >
        {title}
      </ThemedText>

      <ThemedText
        className='mt-10'
        >
        {desc}
      </ThemedText>
    </ThemedView>
  )
}