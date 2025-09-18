import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import { allRoutes } from '@/constants/Routes';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemeChangerProvider } from '@/presentation/context/ThemeChangerContext';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css";


export default function RootLayout() {
  //primer objeto los colores que quiero sobreescribir, ya sea para light o dark,
  //y el 2do argumento es la pieza de nuestro objeto de colores que quiero tomar
  // const backgroundColor = useThemeColor({light: 'red', dark: 'indigo'}, 'background');

  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={{backgroundColor: backgroundColor, flex: 1}}>
      <ThemeChangerProvider>
        {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
          <Stack
            screenOptions={{
              headerShadowVisible: false,
              contentStyle: {
                backgroundColor: backgroundColor
              },
              headerStyle: {
                backgroundColor: backgroundColor
              }
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: ''
              }}
            />
            
            {
              allRoutes.map(route => (
                <Stack.Screen
                  key={route.name}
                  name={route.name}
                  options={{
                    title: route.title,
                    headerShown: !route.title.includes('Slides')
                  }}
                />
              ))
            }
          </Stack>
          <StatusBar style="auto" />
        {/* </ThemeProvider> */}
      </ThemeChangerProvider>
    </GestureHandlerRootView>

  );
}
