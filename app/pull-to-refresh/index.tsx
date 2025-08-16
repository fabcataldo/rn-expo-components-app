import { useThemeColor } from '@/hooks/useThemeColor';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

const PullToRefreshScreen = () => {
  //el {} es para decir que no quiero cambiar el color ni del light ni del dark
  //solo quiero el color primary
  const primaryColor = useThemeColor({}, 'primary');
  
  //los parámetros del usethemecolor significan: 
  //en dark cambiar el fondo del spinner por negro,
  //y si estoy en modo light por blanco
  const backgroundColor = useThemeColor({
    dark: 'black',
    light: 'white'
  }, 'background')

  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const onRefresh = async() => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 3000);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}

          //colors es el cambio de colores del spinner a medida que pasa el tiempo
          colors={[primaryColor, 'red', 'orange', 'green']}

          progressBackgroundColor={backgroundColor}
        />
      }
    >
      <ThemedView margin>
        <ThemedText>PullToRefreshScreen</ThemedText>
      </ThemedView>
      
    </ScrollView>
  );
};
export default PullToRefreshScreen;
